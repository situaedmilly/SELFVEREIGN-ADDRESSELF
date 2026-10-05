# RECEIPTSELF v0.1

## META OURSELFTELLIGENCE

RECEIPTSELF is the evidence boundary after EFFECTSELF. It binds a receipt only to an effect that was observed by reading the resulting state.

## Required request fields

Every receipt-producing request MUST contain:
- request_type
- target_ref
- location_hint
- frequency

For effect binding, the receipt MUST additionally carry:
- capability_ref
- action_ref
- observed_at
- state_delta
- effect_surface
- effect_sha256

location_hint is routing metadata. frequency is cadence metadata. Neither is authority.

## Binding rule

The receipt MUST hash the exact bytes read from the effect surface.

RECEIPTSELF.effect_sha256 = SHA-256(observed effect bytes)

The receipt MUST reproduce the observed target, capability, action, timestamp, and state delta.

## Constitutional separations

EFFECT != RECEIPT
RECEIPT != AUTHORITY
RECEIPT != FUTURE EXECUTION

A receipt proves only what its bound bytes prove.

## v0.1 boundary

The reference implementation is local and deterministic:
1. perform the declared local actuation;
2. read the resulting effect bytes;
3. validate the postcondition;
4. hash the exact observed bytes;
5. write a receipt containing that hash and observed semantic fields;
6. read the receipt back and verify the binding.

No external authority is created, transport invoked, or external system mutated.
