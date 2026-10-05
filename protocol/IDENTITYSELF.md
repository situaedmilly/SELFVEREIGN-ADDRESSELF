# IDENTITYSELF v0.1

IDENTITYSELF resolves an ADDRESSSELF instance into a typed, provenance-bound runtime identity record.

INSTANCE != ADDRESS != LOCATION != IDENTITY != AUTHORITY

Canonical source: node.surfaces[].sna.

Required input:
- target_ref
- instance_address
- address_type
- location_ref
- provenance_ref
- currentness

Output:
- identity_type = RUNTIME_INSTANCE
- identity_id = stable identifier for the bound node/surface
- authority_ref = null at this membrane

Identity prerequisites:
- address_type = INSTANCE_ADDRESS
- instance_address is present
- provenance_ref is present
- currentness is OBSERVED or VERIFIED
- authority_ref remains null

IDENTITYSELF MUST NOT grant authority, admit a node, grant capability, actuate, execute, or claim effect.