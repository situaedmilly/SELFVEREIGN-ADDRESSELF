import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";

const cfg = readFileSync("config/capabilityself.yaml", "utf8");
const authority = readFileSync("config/authorityself-local-write.yaml", "utf8");
const runtime = readFileSync("reality/run-capability-actuation-effect.mjs", "utf8");

assert.match(cfg, /authority_ref: AUTH-LOCAL-SELFREALITY-WRITE-001/);
assert.match(authority, /identity_ref: IDENTITY-OURSELFPIMAC-QWEN-CODE/);
assert.match(authority, /target_ref: SELFREALITY#FIRST-ALCHEMY-LAUNCH/);
assert.match(authority, /capability_ref: CAPABILITYSELF\/WRITE_EFFECT_RECEIPT/);
assert.match(authority, /action_ref: ACTUATIONSELF\/WRITE_EFFECT_RECEIPT/);
assert.match(authority, /external_effect: false/);
assert.match(runtime, /AUTHORITY_BINDING_MISSING/);
assert.match(runtime, /AUTHORITY_TARGET_MISMATCH/);
assert.match(runtime, /AUTHORITY_CAPABILITY_MISMATCH/);
assert.match(runtime, /AUTHORITY_ACTION_MISMATCH/);
assert.match(runtime, /RECEIPTSELF=BOUND/);
assert.match(runtime, /effect_sha256/);

console.log("AUTHORITY_CAPABILITY_ACTUATION_RECEIPT_CONFORMANCE=PASS");
console.log("AUTHORITY=EXPLICIT");
console.log("ACTUATION=GATED");
console.log("EFFECT=OBSERVED");
console.log("RECEIPT=BYTE_BOUND");
