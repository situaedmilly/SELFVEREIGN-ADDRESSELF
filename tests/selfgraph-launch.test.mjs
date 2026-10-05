import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";

const graph = readFileSync("protocol/SELFGRAPH.md", "utf8");
const launch = readFileSync("reality/first-alchemy-launch.yaml", "utf8");
const runtime = readFileSync("reality/boot-runtime.mjs", "utf8");

const nodes = [
  "POINTERSELFTHIRDEYE",
  "[1] RESOLVER",
  "[2] ADDRESSSELF",
  "[3] IDENTITYSELF",
  "[4] ADMISSIONSELF",
  "[5] AUTHORITYSELF",
  "[6] CAPABILITYSELF",
  "[7] ACTUATIONSELF",
  "[8] EFFECTSELF",
  "[9] RECEIPTSELF"
];
for (const node of nodes) assert.ok(graph.includes(node), `missing graph node: ${node}`);
assert.match(launch, /request_type: ALCHEMY_LAUNCH/);
assert.match(launch, /target_ref: SELFREALITY#FIRST-ALCHEMY-LAUNCH/);
assert.match(launch, /location_hint: SELFVEREIGN-ADDRESSELF/);
assert.match(launch, /frequency: ON_DEMAND/);
assert.match(launch, /script_ref: reality\/boot-runtime\.mjs/);
assert.match(launch, /authority_ref: null/);
assert.match(launch, /actuation: null/);
assert.match(launch, /effect: null/);
assert.match(runtime, /SELFGRAPH_BOOT=PASS/);
assert.match(runtime, /NEXT_PRIMITIVE=IDENTITYSELF/);
assert.match(runtime, /AUTHORITY=NONE/);
assert.match(runtime, /ACTUATION=NOT_PERFORMED/);
console.log("SELFGRAPH_LAUNCH_CONFORMANCE=PASS");
console.log("FIRST_ALCHEMY_LAUNCH=DEFINED");
console.log("LOCATION_HINT=EXPLICIT");
console.log("FREQUENCY=EXPLICIT");
console.log("NEXT_PRIMITIVE=IDENTITYSELF");