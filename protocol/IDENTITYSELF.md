# IDENTITYSELF v0.1

IDENTITYSELF resolves an ADDRESSSELF instance into a typed, provenance-bound runtime identity record.

Constitutional separations:
INSTANCE != ADDRESS != LOCATION != IDENTITY != AUTHORITY

Required input:
- target_ref
- instance_address
- address_type
- location_ref
- provenance_ref
- currentness

Canonical source remains node.surfaces[].sna.

Output identity_type is RUNTIME_INSTANCE.
identity_id is an identifier only; it is not authority.

Identity prerequisites:
- address_type = INSTANCE_ADDRESS
- instance_address is present
- provenance_ref is present
- currentness is OBSERVED or VERIFIED
- authority_ref remains null

IDENTITYSELF MUST NOT grant authority, admit a node, actuate, execute, or claim effect.