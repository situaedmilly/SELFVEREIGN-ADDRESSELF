# AUTHORITYSELF v0.1

AUTHORITYSELF evaluates an explicit authority artifact against an admitted identity and bounded action scope.

AUTHORITY != IDENTITY != ADMISSION != CAPABILITY != ACTUATION

A valid authority artifact must explicitly bind:
- authority_id
- subject_identity
- scope
- status = ACTIVE
- issuer

No authority artifact produces NO_AUTHORITY.

AUTHORITYSELF does not execute the requested action and does not infer authority from address, location, identity, capability, or admission.

Decision values:
- AUTHORIZED
- NO_AUTHORITY
- OUT_OF_SCOPE
- EXPIRED