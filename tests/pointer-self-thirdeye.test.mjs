import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolvePointer } from "../src/pointer-self-thirdeye.mjs";

const nodeYaml = readFileSync("node/ourself-mac.yaml", "utf8");

const pointer = {
  instance_address:
    "ia://ourself.ecosystem/node/OURSELFPIMAC#QWEN-CODE",
  target: {
    node_id: "OURSELFPIMAC",
    surface_id: "QWEN-CODE"
  },
  query: {
    question: "WHERE_IS",
    canonical_source: "node.surfaces[].sna"
  }
};

const resolved = resolvePointer(nodeYaml, pointer);

assert.equal(resolved.status, "RESOLVED");
assert.equal(resolved.instance_address, pointer.instance_address);
assert.equal(resolved.node_id, "OURSELFPIMAC");
assert.equal(resolved.surface_id, "QWEN-CODE");
assert.equal(resolved.transport, "LOCAL");
assert.equal(resolved.endpoint, "workspace://~/Projects/ourself-core");
assert.equal(resolved.protocol, "QWEN_CODE_SHELL");
assert.deepEqual(
  resolved.capabilities,
  ["shell_command_execution", "repository_interaction"]
);
assert.equal(resolved.status_of_surface, "OBSERVED");
assert.equal(resolved.witness_ref, "THIRDEYE-QWEN-WINDOW");

assert.equal("authority_ref" in resolved, false);
assert.equal("actuation" in resolved, false);
assert.equal("effect" in resolved, false);

const missing = resolvePointer(nodeYaml, {
  instance_address:
    "ia://ourself.ecosystem/node/OURSELFPIMAC#MISSING",
  target: {
    node_id: "OURSELFPIMAC",
    surface_id: "MISSING"
  },
  query: {
    question: "WHERE_IS",
    canonical_source: "node.surfaces[].sna"
  }
});

assert.deepEqual(missing, {
  status: "NOT_FOUND",
  reason: "SNA_NOT_FOUND"
});

const invalid = resolvePointer(nodeYaml, {
  target: { node_id: "OURSELFPIMAC", surface_id: "QWEN-CODE" },
  query: { question: "DO_IT" }
});

assert.deepEqual(invalid, {
  status: "REJECTED",
  reason: "INVALID_POINTER_QUERY"
});

console.log("POINTERSELFTHIRDEYE=PASS");
console.log("QUERY=WHERE_IS");
console.log("TARGET=OURSELFPIMAC#QWEN-CODE");
console.log("RESOLUTION=LOCAL workspace://~/Projects/ourself-core");
console.log("AUTHORITY=NONE_IN_RESOLUTION");
console.log("ACTUATION=NOT_PERFORMED");
