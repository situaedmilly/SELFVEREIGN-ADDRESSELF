import { strict as assert } from "node:assert";
import { execFileSync } from "node:child_process";

const output = execFileSync("node", ["reality/capabilityself-evaluate.mjs"], { encoding: "utf8" });

assert.match(output, /CAPABILITYSELF=NOT_AUTHORIZED/);
assert.match(output, /CAPABILITY_GRANTED=NO/);
assert.match(output, /ACTUATION=NOT_PERFORMED/);
assert.match(output, /EFFECT=NOT_CLAIMED/);
assert.match(output, /AUTHORITY=NONE/);

console.log("CAPABILITYSELF_HOSTILE_GATE=PASS");
console.log("DECLARED_CAPABILITY=NOT_PERMISSION");
console.log("AUTHORITY_NULL=NO_ACTUATION");
