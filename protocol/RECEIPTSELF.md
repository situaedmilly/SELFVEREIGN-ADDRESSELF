# RECEIPTSELF v0.1

RECEIPTSELF commits observed execution evidence after ACTUATIONSELF and EFFECTSELF.

RECEIPT != EFFECT
RECEIPT != AUTHORITY

A receipt MUST bind:
- target_ref
- capability_ref
- action_ref
- location_hint
- frequency
- observed_at
- effect_surface
- effect_sha256
- implementation_sha256
- configuration_sha256

The receipt MUST be generated from an observed effect artifact. It MUST fail when the effect is missing or mismatched.

RECEIPTSELF does not grant authority, repeat execution, or infer external-world effect.

Canonical surface:
runtime/receipts/last-receipt.json
