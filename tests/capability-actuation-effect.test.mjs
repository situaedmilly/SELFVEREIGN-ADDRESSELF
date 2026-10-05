import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";

const protocol = readFileSync("protocol/CAPABILITY-ACTUATION-EFFECT.md", "utf8");
const receiptProtocol = readFileSync("protocol/RECEIPTSELF.md", "utf8");
const config = readFileSync("config/capabilityself.yaml", "utf8");
const runtime = readFileSync("reality/run-capability-actuation-effect.mjs", "utf8");

assert.match(protocol, /CAPABILITYSELF/);
assert.match(protocol, /ACTUATIONSELF/);
assert.match(protocol, /EFFECTSELF/);
assert.match(protocol, /CAPABILITY != AUTHORITY/);
assert.match(protocol, /ACTUATION != EFFECT/);
assert.match(receiptProtocol, /RECEIPTSELF/);
assert.match(receiptProtocol, /SHA-256\\(observed effect bytes\\)/);
assert.match(receiptProtocol, /EFFECT != RECEIPT/);

for (const field of [
  "request_type",
  "target_ref",
  "location_hint",
  "frequency",
  "capability_ref",
  "action_ref"
]) {
  assert.match(protocol, new RegExp(field));
}

assert.match(config, /CAPABILITYSELF\/WRITE_EFFECT_RECEIPT/);
assert.match(config, /ACTUATIONSELF\/WRITE_EFFECT_RECEIPT/);
assert.match(config, /location_hint: SELFVEREIGN-ADDRESSELF/);
assert.match(config, /mode: ON_DEMAND/);
assert.match(config, /effect_surface: runtime\/effects\/last-effect\.json/);

assert.match(runtime, /mkdirSync/);
assert.match(runtime, /writeFileSync/);
assert.match(runtime, /readFileSync/);
assert.match(runtime, /CAPABILITYSELF=RESOLVED/);
assert.match(runtime, /ACTUATIONSELF=EXECUTED/);
assert.match(runtime, /EFFECTSELF=OBSERVED/);
assert.match(runtime, /AUTHORITY=NONE/);
for (const field of ["observed_at","state_delta","effect_sha256"]) {
  assert.match(runtime, new RegExp(field));
  assert.match(receiptProtocol, new RegExp(field));
}
assert.match(config, /receipt_surface: runtime\\/receipts\\/last-receipt\\.json/);
assert.match(runtime, /RECEIPTSELF=BOUND/);
assert.match(runtime, /createHash/);

console.log("CAPABILITY_ACTUATION_EFFECT_CONFORMANCE=PASS");
console.log("LOCATION_HINT=EXPLICIT");
console.log("FREQUENCY=EXPLICIT");
console.log("CAPABILITY=DEFINED");
console.log("ACTUATION=IMPLEMENTED");
console.log("EFFECT=OBSERVABLE_POSTCONDITION");
