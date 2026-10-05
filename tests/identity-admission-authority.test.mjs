import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

for (const path of [
  "protocol/IDENTITYSELF.md",
  "protocol/ADMISSIONSELF.md",
  "protocol/AUTHORITYSELF.md",
  "reality/identity-admission-authority.yaml",
  "reality/identity-admission-authority.mjs"
]) {
  assert.ok(readFileSync(path, "utf8").length > 0, path);
}

const output = execFileSync(process.execPath, ["reality/identity-admission-authority.mjs"], { encoding: "utf8" });
const receipt = JSON.parse(output);

assert.equal(receipt.identity.identity_type, "RUNTIME_INSTANCE");
assert.equal(receipt.identity.instance_address, "ia://ourself.ecosystem/node/OURSELFPIMAC#QWEN-CODE");
assert.equal(receipt.identity.location_ref, "workspace://~/Projects/ourself-core");
assert.equal(receipt.identity.provenance_ref, "THIRDEYE-QWEN-WINDOW");
assert.equal(receipt.identity.authority_ref, null);

assert.equal(receipt.admission.decision, "ADMITTED");
assert.equal(receipt.admission.authority_ref, null);
assert.equal(receipt.admission.actuation, null);
assert.equal(receipt.admission.effect, null);

assert.equal(receipt.authority.decision, "NO_AUTHORITY");
assert.equal(receipt.authority.authority_id, null);
assert.equal(receipt.actuation, false);
assert.equal(receipt.effect, false);

console.log("IDENTITYSELF=PASS");
console.log("ADMISSIONSELF=ADMITTED");
console.log("AUTHORITYSELF=NO_AUTHORITY");
console.log("ACTUATION=NOT_PERFORMED");
console.log("EFFECT=NOT_CLAIMED");