# CAPABILITYSELF → ACTUATIONSELF → EFFECTSELF v0.1

The three primitives form one causal execution membrane.

CAPABILITYSELF answers: WHAT operation class is admissible?
ACTUATIONSELF answers: DID the runtime perform that exact operation?
EFFECTSELF answers: WHAT observable state changed as a result?

Every execution request MUST contain:
request_type, target_ref, location_hint, frequency, capability_ref, action_ref.

location_hint and frequency are required request-type fields. Neither grants authority.

CAPABILITYSELF/WRITE_EFFECT_RECEIPT is a typed operation class, not authority.

ACTUATIONSELF/WRITE_EFFECT_RECEIPT is the exact execution action.

EFFECTSELF is the independently observed postcondition. The v0.1 effect record MUST contain:
- exact target
- exact capability
- exact action
- execution timestamp (observed_at)
- explicit state delta
- location_hint
- frequency

Effect existence is not authority.

Constitutional separations:
CAPABILITY != AUTHORITY
CAPABILITY != ACTUATION
ACTUATION != EFFECT
RECEIPT != EFFECT
OBSERVATION != AUTHORITY

Execution chain:
REQUEST
  ↓
CAPABILITYSELF
  ↓
ACTUATIONSELF
  ↓
STATE TRANSITION
  ↓
EFFECTSELF
  ↓
RECEIPTSELF

An effect record without provenance is insufficient evidence.

The implementation is local and deterministic. No external transport is invoked and no external node is mutated.
