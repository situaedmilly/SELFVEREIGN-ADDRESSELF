# ADMISSIONSELF v0.1

ADMISSIONSELF decides whether a typed identity satisfies bounded predicates for entry into the governed runtime graph.

ADMISSION != AUTHORITY != ACTUATION != EFFECT

Bounded policy: ADMISSIONSELF-BOUNDED-0.1.

Required predicates:
- identity_type = RUNTIME_INSTANCE
- currentness = OBSERVED or VERIFIED
- provenance_ref is present
- identity authority_ref = null

An ADMITTED result means only that the identity satisfies the stated policy.
Admission binds to one identity and one policy. Missing evidence fails closed.

ADMISSIONSELF MUST NOT grant authority, capability, actuation, execution, or effect.