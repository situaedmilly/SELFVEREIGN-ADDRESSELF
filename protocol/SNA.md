# SNA Contract v0.1

## Purpose

A Sovereign Network Address (SNA) is a typed address object for resolving a node and one of its exposed surfaces.

SNA establishes **addressability**. It does not establish authority, permission, actuation, or effect.

## Constitutional distinctions

```text
node_id
  != surface_id
  != endpoint
  != capability
  != authority
  != witness
```

Therefore:

- addressability != authority
- endpoint reachability != permission
- capability declaration != capability possession
- receipt != effect
- observation != authority

## Typed SNA object

Every SNA record MUST identify, at minimum:

```yaml
sna:
  version:
  namespace:
  node_id:
  surface_id:
  transport:
  endpoint:
  protocol:
  capabilities:
  authority_ref:
  witness_ref:
  status:
```

### Field semantics

| Field | Meaning | Authority implication |
|---|---|---|
| `version` | SNA contract version | None |
| `namespace` | SNA namespace/jurisdiction | None |
| `node_id` | Stable logical node identity | None |
| `surface_id` | Specific exposed surface on the node | None |
| `transport` | Transport class used to reach the surface | None |
| `endpoint` | Addressable locator for the surface | None |
| `protocol` | Protocol spoken at the surface | None |
| `capabilities` | Declared or witnessed operation classes | None by itself |
| `authority_ref` | External reference to an authorization relation | Required for mutation |
| `witness_ref` | Evidence reference supporting the record/currentness | Required for VERIFIED status |
| `status` | Epistemic/runtime status of the address record | Must not imply authority |

## Canonical node instance representation

A node record contains its identity plus one or more exposed surfaces.

Each exposed surface MUST contain exactly one canonical SNA object at:

```text
node.surfaces[].sna
```

Canonical instance shape:

```yaml
node:
  node_id:
  node_type:
  namespace:
  status:
  witness_ref:
  authority_ref:
  surfaces:
    - sna:
        version:
        namespace:
        node_id:
        surface_id:
        transport:
        endpoint:
        protocol:
        capabilities:
        authority_ref:
        witness_ref:
        status:
```

The resolver MUST consume `node.surfaces[].sna` as its canonical address input.

A node-level address locator, when present, is metadata for the node and MUST NOT replace a surface SNA.

The binding rules are:

```text
surface.sna.node_id == node.node_id
surface.sna.namespace == node.namespace
surface.sna.surface_id is unique within node
```

## Status model

```text
DECLARED
  ↓
OBSERVED
  ↓
VERIFIED
```

A record MAY instead enter:

```
QUARANTINED
RETIRED
```

`VERIFIED` requires current evidence supporting the specific SNA fields being asserted.

## Mutation rule

Resolving an SNA MUST NOT authorize an action.

A mutating transition requires a separate authorization relation bound to:

1. the requesting subject,
2. the exact action,
3. the exact target node/surface,
4. the applicable policy,
5. the current state,
6. and the execution/audit evidence requirements.

## Routing rule

A resolver consumes SNA records to answer:

```text
WHERE IS THE TARGET?
WHAT SURFACE IS EXPOSED?
WHAT TRANSPORT REACHES IT?
WHAT PROTOCOL DOES IT SPEAK?
```

It MUST NOT infer:

```text
MAY SELF ACT THERE?
```

That question belongs to the authority/admission layer.

## Node/surface topology

```text
ADDRESSSELF
    │
    └── NODE
          │
          ├── PROCESS
          ├── LISTENER
          └── ENDPOINT
                 │
                 └── PROTOCOL
                       │
                       └── CAPABILITY
                              │
                              └── AUTHORITY
                                     │
                                     └── ACTUATION
                                            │
                                            └── EFFECT
                                                   │
                                                   └── RECEIPT
                                                          │
                                                          └── WITNESS
```

## v0.1 scope

This contract defines representation and constitutional boundaries only.

It does **not** yet implement:

- cryptographic signature verification,
- dynamic discovery,
- runtime admission,
- transport execution,
- capability enforcement,
- actuation,
- effect witnessing,
- BubbleIO binding.

Those belong to later, separately evidenced transitions.
