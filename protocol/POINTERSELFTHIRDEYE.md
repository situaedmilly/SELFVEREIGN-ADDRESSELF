# PointerSelfThirdEye v0.1

## Primitive

PointerSelfThirdEye is the location-query primitive:

\`\`\`text
WHERE_IS({TARGET})?
\`\`\`

It supplies a typed query to the address resolver. It does not authorize, actuate, or witness an effect.

## Canonical target

\`\`\`yaml
pointer:
  instance_address:
  target:
    node_id:
    surface_id:
  query:
    question: "WHERE_IS"
    canonical_source: "node.surfaces[].sna"
\`\`\`

## Resolution

The resolver returns only locational/addressability data:

\`\`\`yaml
resolution:
  instance_address:
  node_id:
  surface_id:
  transport:
  endpoint:
  protocol:
  capabilities:
  status:
  witness_ref:
\`\`\`

Authority, permission, actuation, effect, and effect receipt are intentionally outside the resolution result.

## Instance address rule

Every pointer query and every location receipt MUST identify the concrete instance being referenced.

For this v0.1 repository phase, the deterministic instance-address form is:

\`\`\`text
ia://ourself.ecosystem/repo/{owner}/{repo}@{commit}#{path}
\`\`\`

A runtime node/surface instance may be referenced as:

\`\`\`text
ia://ourself.ecosystem/node/{node_id}#{surface_id}
\`\`\`

The address is an identifier/addressability primitive, not an authority token.

## Constitutional boundary

\`\`\`text
POINTER
   ↓
ADDRESS RESOLUTION
   ↓
LOCATION RECEIPT
   X
AUTHORITY
   X
ACTUATION
   X
EFFECT
\`\`\`

The resolver MUST answer only:

\`\`\`text
WHERE IS THE TARGET?
\`\`\`

It MUST NOT answer:

\`\`\`text
MAY SELF ACT THERE?
\`\`\`
