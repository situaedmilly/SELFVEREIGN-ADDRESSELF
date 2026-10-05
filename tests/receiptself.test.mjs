import { strict as assert } from "node:assert";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const output = execFileSync(process.execPath, ["reality/run-receiptself.mjs"], { encoding: "utf8" });
assert.match(output, /RECEIPTSELF=VERIFIED/);
assert.match(output, /ACTUATION=EXECUTED/);
assert.match(output, /EFFECT=OBSERVED/);
assert.match(output, /AUTHORITY=NONE/);

const receipt = JSON.parse(readFileSync("runtime/receipts/last-receipt.json", "utf8"));
const effect = JSON.parse(readFileSync("runtime/effects/last-effect.json", "utf8"));

assert.equal(receipt.result, "VERIFIED");
assert.equal(receipt.target_ref, effect.target_ref);
assert.equal(receipt.capability_ref, effect.capability_ref);
assert.equal(receipt.action_ref, effect.action_ref);
assert.equal(receipt.location_hint, effect.location_hint);
assert.equal(receipt.frequency, effect.frequency);
assert.equal(receipt.observed_at, effect.observed_at);
assert.equal(receipt.authority_ref, null);
assert.equal(receipt.external_effect, false);

console.log("RECEIPTSELF_CONFORMANCE=PASS");
