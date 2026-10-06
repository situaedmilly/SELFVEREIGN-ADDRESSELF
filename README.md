# SELFVEREIGN-ADDRESSELF
GitHub is treated merely as a public transport fabric and immutable ledger layer, while the repository itself is assigned a Sovereign Network Address (SNA) and a signaling protocol.

## Executable pointer surface

`src/addressself.mjs` implements the canonical AddressSelf operations against the endpoint tree:

- `WHERE_IS(target)`
- `RESOLVE(address)`
- `CHILDREN_OF(parent_id)`
- `PARENT_OF(node_id)`
- `CREATE_CHILD(parent_id, node)`

The tree is therefore both registry data and an executable pointer contract. Run the tests with Node's built-in test runner: `node --test test/addressself.test.mjs`.
