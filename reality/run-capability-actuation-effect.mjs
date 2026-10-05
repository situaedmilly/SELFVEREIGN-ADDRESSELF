import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const config = readFileSync(resolve(root, "config/capabilityself.yaml"), "utf8");
const effectDir = resolve(root, "runtime/effects");
const receiptDir = resolve(root, "runtime/receipts");
const effectPath = resolve(effectDir, "last-effect.json");
const receiptPath = resolve(receiptDir, "last-receipt.json");

const required = [
  "CAPABILITYSELF/WRITE_EFFECT_RECEIPT",
  "CAPABILITY_ACTUATION",
  "SELFVEREIGN-ADDRESSELF",
  "ON_DEMAND",
  "ACTUATIONSELF/WRITE_EFFECT_RECEIPT",
  "runtime/effects/last-effect.json"
];

for (const token of required) {
  if (!config.includes(token)) throw new Error("CAPABILITY_CONFIG_INVALID:" + token);
}

const target = "SELFREALITY#FIRST-ALCHEMY-LAUNCH";
const capability = "CAPABILITYSELF/WRITE_EFFECT_RECEIPT";
const action = "ACTUATIONSELF/WRITE_EFFECT_RECEIPT";
const observedAt = new Date().toISOString();
const stateDelta = {
  surface: "runtime/effects/last-effect.json",
  operation: "CREATE_OR_REPLACE_EFFECT_RECORD",
  resulting_state: "EFFECT_RECORD_PRESENT"
};

mkdirSync(effectDir, { recursive: true });
mkdirSync(receiptDir, { recursive: true });

const effect = {
  effect_type: "LOCAL_RUNTIME_STATE_DELTA",
  target_ref: target,
  capability_ref: capability,
  action_ref: action,
  location_hint: "SELFVEREIGN-ADDRESSELF",
  frequency: "ON_DEMAND",
  authority_ref: null,
  observed_at: observedAt,
  state_delta: stateDelta,
  postcondition: "effect file exists and matches the action target"
};

const effectBytes = JSON.stringify(effect, null, 2) + "\n";
writeFileSync(effectPath, effectBytes, "utf8");

const observedBytes = readFileSync(effectPath, "utf8");
const observed = JSON.parse(observedBytes);

if (observed.target_ref !== target) throw new Error("EFFECT_TARGET_MISMATCH");
if (observed.action_ref !== action) throw new Error("EFFECT_ACTION_MISMATCH");
if (observed.capability_ref !== capability) throw new Error("EFFECT_CAPABILITY_MISMATCH");
if (observed.authority_ref !== null) throw new Error("EFFECT_AUTHORITY_MISMATCH");
if (!observed.observed_at) throw new Error("EFFECT_TIMESTAMP_MISSING");
if (!observed.state_delta) throw new Error("EFFECT_STATE_DELTA_MISSING");

const effectSha256 = createHash("sha256").update(observedBytes, "utf8").digest("hex");

const receipt = {
  receipt_type: "RECEIPTSELF/EFFECT_BINDING",
  version: "0.1",
  target_ref: target,
  capability_ref: capability,
  action_ref: action,
  location_hint: "SELFVEREIGN-ADDRESSELF",
  frequency: "ON_DEMAND",
  authority_ref: null,
  actuation: "EXECUTED",
  effect: "OBSERVED",
  observed_at: observed.observed_at,
  state_delta: observed.state_delta,
  effect_surface: "runtime/effects/last-effect.json",
  effect_sha256: effectSha256,
  receipt_binding: "SHA256_OF_EXACT_OBSERVED_EFFECT_BYTES"
};

writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + "\n", "utf8");

const receiptObserved = JSON.parse(readFileSync(receiptPath, "utf8"));
if (receiptObserved.effect_sha256 !== effectSha256) throw new Error("RECEIPT_EFFECT_HASH_MISMATCH");
if (receiptObserved.observed_at !== observed.observed_at) throw new Error("RECEIPT_TIMESTAMP_MISMATCH");
if (JSON.stringify(receiptObserved.state_delta) !== JSON.stringify(observed.state_delta)) {
  throw new Error("RECEIPT_STATE_DELTA_MISMATCH");
}

console.log("CAPABILITYSELF=RESOLVED");
console.log("ACTUATIONSELF=EXECUTED");
console.log("EFFECTSELF=OBSERVED");
console.log("RECEIPTSELF=BOUND");
console.log("TARGET_REF=" + target);
console.log("LOCATION_HINT=SELFVEREIGN-ADDRESSELF");
console.log("FREQUENCY=ON_DEMAND");
console.log("AUTHORITY=NONE");
console.log("EFFECT_SURFACE=runtime/effects/last-effect.json");
console.log("RECEIPT_SURFACE=runtime/receipts/last-receipt.json");
console.log("EFFECT_SHA256=" + effectSha256);
