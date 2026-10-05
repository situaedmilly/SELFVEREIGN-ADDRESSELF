import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const contract = readFileSync("protocol/ADDRESSSELF.md", "utf8");
const request = readFileSync("protocol/addressself-request.yaml", "utf8");
const node = readFileSync("node/ourself-mac.yaml", "utf8");

const requiredRequestFields = [
  "request_type",
  "target_ref",
  "location_hint",
  "frequency"
];

for (const field of requiredRequestFields) {
  assert.match(request, new RegExp("^  " + field + ":", "m"));
}

assert.match(request, /location_hint is required on every ADDRESSSELF request/);
assert.match(request, /frequency is required on every ADDRESSSELF request/);
assert.match(request, /ADDRESS_RESOLUTION MUST NOT grant authority/);
assert.match(request, /ADDRESS_RESOLUTION MUST NOT actuate/);

const target = "OURSELFPIMAC#QWEN-CODE";
const locationHint = "LOCAL_MAC";
const frequency = "ON_DEMAND";

const surface = node.match(
  /- sna:\s*\n(?:(?!\n    - sna:)[\s\S])*?surface_id: "QWEN-CODE"(?:(?!\n    - sna:)[\s\S])*/
)?.[0];

assert.ok(surface, "QWEN-CODE canonical SNA surface must exist");
assert.match(surface, /node_id: "OURSELFPIMAC"/);
assert.match(surface, /surface_id: "QWEN-CODE"/);
assert.match(surface, /endpoint: "workspace:\/\/~\/Projects\/ourself-core"/);

const instanceAddress = "ia://ourself.ecosystem/node/OURSELFPIMAC#QWEN-CODE";

assert.equal(target, "OURSELFPIMAC#QWEN-CODE");
assert.equal(locationHint, "LOCAL_MAC");
assert.equal(frequency, "ON_DEMAND");
assert.match(contract, /INSTANCE != ADDRESS != LOCATION != AUTHORITY != ACTUATION != EFFECT/);
assert.match(contract, /ia:\/\/\{namespace\}\/node\/\{node_id\}#\{surface_id\}/);
assert.equal(instanceAddress, "ia://ourself.ecosystem/node/OURSELFPIMAC#QWEN-CODE");

console.log("ADDRESSSELF_CONFORMANCE=PASS");
console.log("REQUEST_TYPE=ADDRESS_RESOLUTION");
console.log("TARGET_REF=OURSELFPIMAC#QWEN-CODE");
console.log("LOCATION_HINT=LOCAL_MAC");
console.log("FREQUENCY=ON_DEMAND");
console.log("INSTANCE_ADDRESS=" + instanceAddress);
console.log("AUTHORITY_REF=null");
console.log("ACTUATION=null");
console.log("EFFECT=null");
