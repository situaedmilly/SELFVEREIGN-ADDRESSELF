import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const graph = readFileSync(resolve(root, "protocol/SELFGRAPH.md"), "utf8");
const launch = readFileSync(resolve(root, "reality/first-alchemy-launch.yaml"), "utf8");

const requiredGraphNodes = [
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

for (const node of requiredGraphNodes) {
  if (!graph.includes(node)) throw new Error(`SELFGRAPH missing node: ${node}`);
}

for (const field of [
  "request_type: ALCHEMY_LAUNCH",
  "target_ref: SELFREALITY#FIRST-ALCHEMY-LAUNCH",
  "location_hint: SELFVEREIGN-ADDRESSELF",
  "frequency: ON_DEMAND",
  "script_ref: reality/boot-runtime.mjs"
]) {
  if (!launch.includes(field)) throw new Error(`launch request missing: ${field}`);
}

if (!launch.includes("authority_ref: null")) throw new Error("launch authority must be null");
if (!launch.includes("actuation: null")) throw new Error("launch actuation must be null");
if (!launch.includes("effect: null")) throw new Error("launch effect must be null");

const instanceAddress = "ia://ourself.ecosystem/reality/SELFREALITY#FIRST-ALCHEMY-LAUNCH";
const scriptAddress = "ia://ourself.ecosystem/repo/situaedmilly/SELFVEREIGN-ADDRESSELF@HEAD#reality/boot-runtime.mjs";

console.log("SELFGRAPH_BOOT=PASS");
console.log("REQUEST_TYPE=ALCHEMY_LAUNCH");
console.log("TARGET_REF=SELFREALITY#FIRST-ALCHEMY-LAUNCH");
console.log("LOCATION_HINT=SELFVEREIGN-ADDRESSELF");
console.log("FREQUENCY=ON_DEMAND");
console.log("LAUNCH_INSTANCE=" + instanceAddress);
console.log("SCRIPT_INSTANCE=" + scriptAddress);
console.log("NEXT_PRIMITIVE=IDENTITYSELF");
console.log("AUTHORITY=NONE");
console.log("ACTUATION=NOT_PERFORMED");
console.log("EFFECT=NOT_CLAIMED");