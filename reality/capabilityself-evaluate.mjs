import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const config = readFileSync(resolve(root, "config/capabilityself.yaml"), "utf8");

const request = {
  request_type: "CAPABILITY_EVALUATION",
  target_ref: "IDENTITY-OURSELFPIMAC-QWEN-CODE",
  location_hint: "SELFVEREIGN-ADDRESSELF",
  frequency: "ON_DEMAND",
  capability_ref: "CAPABILITYSELF/WRITE_EFFECT_RECEIPT"
};

const capabilityDeclared = config.includes(request.capability_ref);
const authorityPresent = /authority_ref:\s*null/.test(config) === false;

if (!capabilityDeclared) {
  console.log("CAPABILITYSELF=NOT_DECLARED");
  process.exit(0);
}

if (!authorityPresent) {
  console.log("CAPABILITYSELF=NOT_AUTHORIZED");
  console.log("CAPABILITY_GRANTED=NO");
  console.log("ACTUATION=NOT_PERFORMED");
  console.log("EFFECT=NOT_CLAIMED");
  console.log("AUTHORITY=NONE");
  process.exit(0);
}

console.log("CAPABILITYSELF=AUTHORIZED_BY_SEPARATE_AUTHORITY");
console.log("CAPABILITY_GRANTED=YES");
