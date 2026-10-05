import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const config = readFileSync(resolve(root, "config/capabilityself.yaml"), "utf8");
const effectDir = resolve(root, "runtime/effects");
const effectPath = resolve(effectDir, "last-effect.json");

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

mkdirSync(effectDir, { recursive: true });

const effect = {
  effect_type: "LOCAL_RUNTIME_STATE_DELTA",
  target_ref: target,
  capability_ref: capability,
  action_ref: action,
  location_hint: "SELFVEREIGN-ADDRESSELF",
  frequency: "ON_DEMAND",
  authority_ref: null,
  postcondition: "effect file exists and matches the action target"
};

writeFileSync(effectPath, JSON.stringify(effect, null, 2) + "\n", "utf8");

const observed = JSON.parse(readFileSync(effectPath, "utf8"));

if (observed.target_ref !== target) throw new Error("EFFECT_TARGET_MISMATCH");
if (observed.action_ref !== action) throw new Error("EFFECT_ACTION_MISMATCH");
if (observed.capability_ref !== capability) throw new Error("EFFECT_CAPABILITY_MISMATCH");

console.log("CAPABILITYSELF=RESOLVED");
console.log("ACTUATIONSELF=EXECUTED");
console.log("EFFECTSELF=OBSERVED");
console.log("TARGET_REF=" + target);
console.log("LOCATION_HINT=SELFVEREIGN-ADDRESSELF");
console.log("FREQUENCY=ON_DEMAND");
console.log("AUTHORITY=NONE");
console.log("EFFECT_SURFACE=runtime/effects/last-effect.json");
