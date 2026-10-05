import { readFileSync } from "node:fs";
import crypto from "node:crypto";

const nodeSource = readFileSync(new URL("../node/ourself-mac.yaml", import.meta.url), "utf8");
const requestSource = readFileSync(new URL("./identity-admission-authority.yaml", import.meta.url), "utf8");

function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex"); }
function has(text, re) { return re.test(text); }

const targetRef = "OURSELFPIMAC#QWEN-CODE";
const identity = {
  identity_type: "RUNTIME_INSTANCE",
  identity_id: "IDENTITY-OURSELFPIMAC-QWEN-CODE",
  target_ref: targetRef,
  instance_address: "ia://ourself.ecosystem/node/OURSELFPIMAC#QWEN-CODE",
  address_type: "INSTANCE_ADDRESS",
  location_ref: "workspace://~/Projects/ourself-core",
  provenance_ref: "THIRDEYE-QWEN-WINDOW",
  currentness: "OBSERVED",
  authority_ref: null
};

if (!has(nodeSource, /node_id:\s*"OURSELFPIMAC"/) || !has(nodeSource, /surface_id:\s*"QWEN-CODE"/) || !has(nodeSource, /endpoint:\s*"workspace:\/\/~\/Projects\/ourself-core"/)) throw new Error("IDENTITYSELF_SOURCE_BINDING_FAILED");

const admissionEligible = identity.identity_type === "RUNTIME_INSTANCE" && ["OBSERVED", "VERIFIED"].includes(identity.currentness) && Boolean(identity.provenance_ref) && identity.authority_ref === null;
const admission = {
  admission_id: "ADMISSION-" + sha256(JSON.stringify(identity)).slice(0, 16),
  decision: admissionEligible ? "ADMITTED" : "REJECTED",
  reason: admissionEligible ? "IDENTITY_PREDICATES_SATISFIED" : "IDENTITY_PREDICATES_FAILED",
  identity_id: identity.identity_id,
  policy_id: "ADMISSIONSELF-BOUNDED-0.1",
  authority_ref: null,
  actuation: null,
  effect: null
};

const requestedScope = "LOCAL_MODEL_INFERENCE_ONLY";
const authorityArtifact = null;
const authorityDecision = admission.decision !== "ADMITTED" ? "ADMISSION_REQUIRED" : authorityArtifact ? "AUTHORIZED" : "NO_AUTHORITY";
const authority = {
  authority_id: authorityArtifact?.authority_id ?? null,
  decision: authorityDecision,
  identity_id: identity.identity_id,
  action_scope: requestedScope,
  admission_id: admission.admission_id
};

const receipt = {
  receipt_version: "0.1",
  result: "EVALUATION_COMPLETE",
  request_type: "IDENTITY_ADMISSION_AUTHORITY_EVALUATION",
  target_ref: targetRef,
  identity,
  admission,
  authority,
  evidence: { node_source_sha256: sha256(nodeSource), request_source_sha256: sha256(requestSource) },
  actuation: false,
  effect: false
};

console.log(JSON.stringify(receipt, null, 2));