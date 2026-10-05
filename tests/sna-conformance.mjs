import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const schema = readFileSync("protocol/node-schema.yaml", "utf8");
const node = readFileSync("node/ourself-mac.yaml", "utf8");

const requiredSnaFields = [
  "version:",
  "namespace:",
  "node_id:",
  "surface_id:",
  "transport:",
  "endpoint:",
  "protocol:",
  "capabilities:",
  "authority_ref:",
  "witness_ref:",
  "status:"
];

for (const field of requiredSnaFields) {
  assert.match(schema, new RegExp(String.raw`\\b${field.replace(":", ":")}\\b`));
}

const surfaceBlocks = node.split(/^    - sna:\s*$/m).slice(1);
assert.equal(surfaceBlocks.length, 6, "OURSELFPIMAC must expose six canonical SNA surfaces");

const surfaceIds = [];
for (const block of surfaceBlocks) {
  for (const field of ["version:", "namespace:", "node_id:", "surface_id:", "transport:", "endpoint:", "protocol:", "capabilities:", "authority_ref:", "witness_ref:", "status:"]) {
    assert.match(block, new RegExp(String.raw`^        ${field}`, "m"), `missing canonical SNA field: ${field}`);
  }

  const id = block.match(/^        surface_id: "([^"]+)"/m)?.[1];
  assert.ok(id, "surface_id must be present");
  surfaceIds.push(id);

  assert.match(block, /^        node_id: "OURSELFPIMAC"$/m);
  assert.match(block, /^        namespace: "OURSELF_ECOSYSTEM"$/m);
}

assert.equal(new Set(surfaceIds).size, surfaceIds.length, "surface_id must be unique within the node");

assert.match(
  schema,
  /node\.surfaces\[\]\.sna is the canonical address object consumed by a resolver/
);

assert.match(
  node,
  /canonical_surface_address_path: "node\.surfaces\[\]\.sna"/
);

console.log("SNA_CONFORMANCE=PASS");
console.log(`CANONICAL_SURFACES=${surfaceIds.length}`);
console.log(`SURFACE_IDS=${surfaceIds.join(",")}`);
