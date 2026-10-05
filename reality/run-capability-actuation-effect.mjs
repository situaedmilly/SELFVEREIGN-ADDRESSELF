import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
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
  "runtime/effects/last-effect.json",
  "AUTH-LOCAL-SELFREALITY-WRITE-001",
  "IDENTITY-OURSELFPIMAC-QWEN-CODE"
];

for (const token of required) {
  if (!config.includes(token)) throw new Error("CAPABILITY_CONFIG_INVALID:" + token);
}

const target = "SELFREALITY#FIRST-ALCHEMY-LAUNCH";
const capability = "CAPABILITYSELF/WRITE_EFFECT_RECEIPT";
const action = "ACTUATIONSELF/WRITE_EFFECT_RECEIPT";
const authority = "AUTH-LOCAL-SELFREALITY-WRITE-001";
const identity = "IDENTITY-OURSELFPIMAC-QWEN-CODE";
const existedBefore = existsSync(effectPath);
const observedAt = new Date().toISOString();

if (!config.includes("authority_ref: " + authority)) throw new Error("AUTHORITY_BINDING_MISSING");
if (!config.includes("identity_ref: " + identity)) throw new Error("AUTHORITY_IDENTITY_MISMATCH");
if (!config.includes("target_ref: " + target)) throw new Error("AUTHORITY_TARGET_MISMATCH");
if (!config.includes("capability_ref: " + capability)) throw new Error("AUTHORITY_CAPABILITY_MISMATCH");
if (!config.includes("action_ref: " + action)) throw new Error("AUTHORITY_ACTION_MISMATCH");

mkdirSync(effectDir, { recursive: true });
mkdirSync(receiptDir, { recursive: true });

const effect = {
  effect_type: "LOCAL_RUNTIME_STATE_DELTA",
  target_ref: target,
  capability_ref: capability,
  action_ref: action,
  location_hint: "SELFVEREIGN-ADDRESSELF",
  frequency: "ON_DEMAND",
  authority_ref: authority,
  identity_ref: identity,
  observed_at: observedAt,
  state_delta: {
    surface: "runtime/effects/last-effect.json",
    before: existedBefore ? "present" : "absent",
    after: "present"
  },
  postcondition: "effect file exists and matches the action target"
};

writeFileSync(effectPath, JSON.stringify(effect, null, 2) + "\n", "utf8");

const observed = JSON.parse(readFileSync(effectPath, "utf8"));

if (observed.target_ref !== target) throw new Error("EFFECT_TARGET_MISMATCH");
if (observed.action_ref !== action) throw new Error("EFFECT_ACTION_MISMATCH");
if (observed.capability_ref !== capability) throw new Error("EFFECT_CAPABILITY_MISMATCH");
if (observed.authority_ref !== authority) throw new Error("EFFECT_AUTHORITY_MISMATCH");
if (observed.identity_ref !== identity) throw new Error("EFFECT_IDENTITY_MISMATCH");
if (!observed.observed_at) throw new Error("EFFECT_TIMESTAMP_MISSING");
if (observed.state_delta?.after !== "present") throw new Error("EFFECT_STATE_DELTA_MISSING");

console.log("CAPABILITYSELF=RESOLVED");
console.log("ACTUATIONSELF=EXECUTED");
console.log("EFFECTSELF=OBSERVED");
console.log("TARGET_REF=" + target);
console.log("LOCATION_HINT=SELFVEREIGN-ADDRESSELF");
console.log("FREQUENCY=ON_DEMAND");
console.log("AUTHORITY=NONE");
console.log("EFFECT_SURFACE=runtime/effects/last-effect.json");
console.log("OBSERVED_AT=" + observed.observed_at);
console.log("STATE_DELTA=" + observed.state_delta.before + "->" + observed.state_delta.after);

import { createHash } from "node:crypto";
const effectBytes = readFileSync(effectPath, "utf8");
const effectSha256 = createHash("sha256").update(effectBytes, "utf8").digest("hex");
const receipt = {
  receipt_type: "RECEIPTSELF/EFFECT_BINDING",
  target_ref: target,
  identity_ref: identity,
  authority_ref: authority,
  capability_ref: capability,
  action_ref: action,
  observed_at: observed.observed_at,
  state_delta: observed.state_delta,
  effect_surface: "runtime/effects/last-effect.json",
  effect_sha256: effectSha256,
  external_effect: false
};
writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + "\n", "utf8");
const receiptObserved = JSON.parse(readFileSync(receiptPath, "utf8"));
if (receiptObserved.effect_sha256 !== effectSha256) throw new Error("RECEIPT_EFFECT_HASH_MISMATCH");
console.log("AUTHORITYSELF=AUTHORIZED");
console.log("RECEIPTSELF=BOUND");
console.log("RECEIPT_SURFACE=runtime/receipts/last-receipt.json");
console.log("EFFECT_SHA256=" + effectSha256);
