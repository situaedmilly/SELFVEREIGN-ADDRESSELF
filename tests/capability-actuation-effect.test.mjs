import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";

const protocol = readFileSync("protocol/CAPABILITY-ACTUATION-EFFECT.md", "utf8");
const config = readFileSync("config/capabilityself.yaml", "utf8");
const runtime = readFileSync("reality/run-capability-actuation-effect.mjs", "utf8");

assert.match(protocol, /CAPABILITYSELF/);
assert.match(protocol, /ACTUATIONSELF/);
assert.match(protocol, /EFFECTSELF/);
assert.match(protocol, /CAPABILITY != AUTHORITY/);
assert.match(protocol, /ACTUATION != EFFECT/);
assert.match(protocol, /execution timestamp/);
assert.match(protocol, /state delta/);

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

assert.match(runtime, /existsSync/);
assert.match(runtime, /observedAt/);
assert.match(runtime, /state_delta/);
assert.match(runtime, /writeFileSync/);
assert.match(runtime, /readFileSync/);
assert.match(runtime, /CAPABILITYSELF=RESOLVED/);
assert.match(runtime, /ACTUATIONSELF=EXECUTED/);
assert.match(runtime, /EFFECTSELF=OBSERVED/);

console.log("CAPABILITY_ACTUATION_EFFECT_CONFORMANCE=PASS");
console.log("OBSERVED_AT=REQUIRED");
console.log("STATE_DELTA=REQUIRED");
console.log("AUTHORITY=NONE");
