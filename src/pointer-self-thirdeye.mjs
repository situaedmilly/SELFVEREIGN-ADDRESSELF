/**
 * PointerSelfThirdEye v0.1
 *
 * Location-only resolver for the canonical node.surfaces[].sna representation.
 * This parser is intentionally bounded to the repository's v0.1 YAML shape.
 */

import { readFileSync } from "node:fs";

const REQUIRED_KEYS = [
  "version",
  "namespace",
  "node_id",
  "surface_id",
  "transport",
  "endpoint",
  "protocol",
  "capabilities",
  "authority_ref",
  "witness_ref",
  "status"
];

function scalar(block, key) {
  const pattern = "^        " + key + ': "?(.*?)"?\\\\s*$';
  const match = block.match(new RegExp(pattern, "m"));
  return match?.[1] ?? null;
}

function capabilities(block) {
  const match = block.match(/^        capabilities:\\s*$([\\s\\S]*?)(?=^        (?:authority_ref|witness_ref|status):)/m);
  if (!match) return [];
  return [...match[1].matchAll(/^          - "?([^"\\n]+)"?\\s*$/gm)].map((m) => m[1]);
}

export function parseCanonicalSnaRecords(yamlText) {
  const blocks = yamlText.split(/^    - sna:\\s*$/m).slice(1);
  return blocks.map((block) => {
    const record = {};
    for (const key of REQUIRED_KEYS) {
      record[key] = scalar(block, key);
    }
    record.capabilities = capabilities(block);
    return record;
  });
}

export function resolvePointer(yamlText, pointer) {
  if (!pointer || pointer.query?.question !== "WHERE_IS") {
    return {
      status: "REJECTED",
      reason: "INVALID_POINTER_QUERY"
    };
  }

  const targetNode = pointer.target?.node_id;
  const targetSurface = pointer.target?.surface_id;
  if (!targetNode || !targetSurface) {
    return {
      status: "REJECTED",
      reason: "TARGET_REQUIRES_NODE_AND_SURFACE"
    };
  }

  const records = parseCanonicalSnaRecords(yamlText);
  const match = records.find(
    (record) =>
      record.node_id === targetNode &&
      record.surface_id === targetSurface
  );

  if (!match) {
    return {
      status: "NOT_FOUND",
      reason: "SNA_NOT_FOUND"
    };
  }

  return {
    status: "RESOLVED",
    instance_address: pointer.instance_address ?? null,
    node_id: match.node_id,
    surface_id: match.surface_id,
    transport: match.transport,
    endpoint: match.endpoint,
    protocol: match.protocol,
    capabilities: match.capabilities,
    status_of_surface: match.status,
    witness_ref: match.witness_ref
  };
}
