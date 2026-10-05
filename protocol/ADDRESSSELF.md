# ADDRESSSELF v0.1

## Purpose

ADDRESSSELF resolves a PointerSelfThirdEye request into the canonical address of an addressable instance without granting authority or performing actuation.

ADDRESSSELF separates:

INSTANCE != ADDRESS != LOCATION != AUTHORITY != ACTUATION != EFFECT

## Request Contract

Every ADDRESSSELF request MUST explicitly contain:

- `request_type`
- `target_ref`
- `location_hint`
- `frequency`

Canonical request type:

```yaml
request_type: ADDRESS_RESOLUTION
target_ref: "OURSELFPIMAC#QWEN-CODE"
location_hint: "LOCAL_MAC"
frequency: "ON_DEMAND"
```

`location_hint` is a routing/disambiguation hint. It is not proof of current location.

`frequency` declares the intended resolution cadence. It does not authorize polling, execution, or persistence.

## Resolution

Input:

```
ADDRESS_RESOLUTION(target_ref, location_hint, frequency)
```

Canonical source:

```
node.surfaces[].sna
```

Output:

```yaml
target_ref: "OURSELFPIMAC#QWEN-CODE"
instance_address: "ia://ourself.ecosystem/node/OURSELFPIMAC#QWEN-CODE"
address_type: "INSTANCE_ADDRESS"
location_ref: "workspace://~/Projects/ourself-core"
provenance_ref: "THIRDEYE-QWEN-WINDOW"
currentness: "OBSERVED"
authority_ref: null
actuation: null
effect: null
```

The resolver MUST NOT infer identity beyond the node/surface binding witnessed by the source record.

## Address Construction

For a canonical node/surface pair:

```
ia://{namespace}/node/{node_id}#{surface_id}
```

The instance address identifies the addressable node/surface pair. It does not grant authority over it.

## Currentness

ADDRESSSELF preserves source status as currentness evidence:

- DECLARED
- OBSERVED
- VERIFIED
- QUARANTINED
- RETIRED

A location string MUST NOT be promoted to VERIFIED solely because it is syntactically valid.

## Forbidden Transitions

ADDRESSSELF MUST reject or refuse to perform:

```
LOCATION -> IDENTITY
ADDRESS -> AUTHORITY
IDENTITY -> AUTHORITY
OBSERVATION -> ADMISSION
ADMISSION -> ACTUATION
RECEIPT -> EFFECT
```

ADDRESSSELF resolution alone MUST NOT:

- grant authority
- grant capability
- admit a node
- invoke a transport
- execute a command
- claim an effect
- convert a receipt into an effect

## Ecosystem Scope

ADDRESSSELF is transport-agnostic and node-agnostic. LOCAL, REMOTE, CLOUD, HTTPS, HTTP, IPC, STDIO, and other transports are downstream properties of the resolved SNA, not separate ADDRESSSELF implementations.

## Relationship

```
POINTERSELFTHIRDEYE
        |
        | WHERE_IS(target)?
        v
ADDRESSSELF
        |
        | WHAT_IS_THE_ADDRESSABLE_INSTANCE?
        v
INSTANCE_ADDRESS
        |
        v
CURRENTNESS / PROVENANCE
        |
        X
NO AUTHORITY
        X
NO ACTUATION
```

The next membrane is ADMISSIONSELF.
