# ADDRESSSELF Endpoint Tree v0.1

The AddressSelf repository is the canonical address registry for OURSELF endpoint topology.

## Tree law

A network endpoint is a root address node. Services are direct children. Routes/resources are children of their service endpoint.

```
192.168.12.112
├── 22 / SSH
├── 3000 / HTTP
│   ├── /health
│   ├── /mcp
│   └── /v1/models
└── 11434 / HTTP / Ollama
    ├── /v1/models
    └── /mcp
```

The tree is represented in `addresses/192.168.12.112/endpoint-tree.json`.

## AddressSelf operations

- `WHERE_IS(target)` — resolve a canonical node.
- `CHILDREN_OF(parent_id)` — enumerate direct descendants.
- `PARENT_OF(node_id)` — walk upward.
- `RESOLVE(address)` — map an address/URL to its node.
- `CREATE_CHILD(parent_id, node)` — create a new addressable descendant.

## Reality rule

Declaration is not proof of liveness. Each node carries an explicit state such as `OBSERVED_LIVE`, `OBSERVED_NOT_FOUND`, or `NOT_DECLARED_LIVE`.

Therefore the AddressSelf tree is simultaneously the **address registry** and the canonical pointer surface, while endpoint reality remains evidence-backed state attached to each node.
