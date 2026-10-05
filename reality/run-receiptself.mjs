import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import crypto from "node:crypto";

const root = resolve(import.meta.dirname, "..");
const effectPath = resolve(root, "runtime/effects/last-effect.json");
const receiptDir = resolve(root, "runtime/receipts");
const receiptPath = resolve(receiptDir, "last-receipt.json");
const configPath = resolve(root, "config/capabilityself.yaml");
const implementationPath = resolve(root, "reality/run-capability-actuation-effect.mjs");

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

const effectRaw = readFileSync(effectPath, "utf8");
const effect = JSON.parse(effectRaw);
const configRaw = readFileSync(configPath, "utf8");
const implementationRaw = readFileSync(implementationPath, "utf8");

if (effect.target_ref !== "SELFREALITY#FIRST-ALCHEMY-LAUNCH") throw new Error("RECEIPT_TARGET_MISMATCH");
if (effect.capability_ref !== "CAPABILITYSELF/WRITE_EFFECT_RECEIPT") throw new Error("RECEIPT_CAPABILITY_MISMATCH");
if (effect.action_ref !== "ACTUATIONSELF/WRITE_EFFECT_RECEIPT") throw new Error("RECEIPT_ACTION_MISMATCH");
if (effect.location_hint !== "SELFVEREIGN-ADDRESSELF") throw new Error("RECEIPT_LOCATION_MISMATCH");
if (effect.frequency !== "ON_DEMAND") throw new Error("RECEIPT_FREQUENCY_MISMATCH");
if (!effect.observed_at) throw new Error("RECEIPT_TIMESTAMP_MISSING");
if (effect.state_delta?.after !== "present") throw new Error("RECEIPT_STATE_DELTA_MISSING");

const receipt = {
  receipt_version: "0.1",
  receipt_type: "EFFECT_EXECUTION_RECEIPT",
  result: "VERIFIED",
  target_ref: effect.target_ref,
  capability_ref: effect.capability_ref,
  action_ref: effect.action_ref,
  location_hint: effect.location_hint,
  frequency: effect.frequency,
  observed_at: effect.observed_at,
  effect_surface: "runtime/effects/last-effect.json",
  effect_sha256: sha256(effectRaw),
  implementation_sha256: sha256(implementationRaw),
  configuration_sha256: sha256(configRaw),
  authority_ref: null,
  actuation: "EXECUTED",
  effect: "OBSERVED",
  external_effect: false
};

mkdirSync(receiptDir, { recursive: true });
writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + "\n", "utf8");

const observedReceipt = JSON.parse(readFileSync(receiptPath, "utf8"));
if (observedReceipt.effect_sha256 !== sha256(effectRaw)) throw new Error("RECEIPT_EFFECT_HASH_MISMATCH");
if (observedReceipt.implementation_sha256 !== sha256(implementationRaw)) throw new Error("RECEIPT_IMPLEMENTATION_HASH_MISMATCH");
if (observedReceipt.configuration_sha256 !== sha256(configRaw)) throw new Error("RECEIPT_CONFIGURATION_HASH_MISMATCH");

console.log("RECEIPTSELF=VERIFIED");
console.log("TARGET_REF=" + observedReceipt.target_ref);
console.log("CAPABILITY=" + observedReceipt.capability_ref);
console.log("ACTION=" + observedReceipt.action_ref);
console.log("EFFECT_SHA256=" + observedReceipt.effect_sha256);
console.log("AUTHORITY=NONE");
console.log("ACTUATION=EXECUTED");
console.log("EFFECT=OBSERVED");
