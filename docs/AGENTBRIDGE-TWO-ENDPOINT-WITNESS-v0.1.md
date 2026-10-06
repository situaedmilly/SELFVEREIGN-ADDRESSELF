# AGENTBRIDGE Two-Endpoint Witness v0.1

AddressSelf is the canonical pointer surface for the two AGENTBRIDGE endpoint identities.

| ID | Canonical node | Address | Reality |
|---|---|---|---|
| AGENTBRIDGE01 | ADDR-192-168-12-112-3000-mcpAGENTBRIDGE01 | http://192.168.12.112:3000/mcpAGENTBRIDGE01 | NOT_DECLARED_LIVE |
| AGENTBRIDGE02 | ADDR-192-168-12-112-11434-v1-modelAGENTBRIDGE02 | http://192.168.12.112:11434/v1/modelAGENTBRIDGE02 | OBSERVED_LIVE / 200 |

## Witness rule

`WITNESS_READY` means the topology, identities, and evidence fields are materialized and addressable. It does not promote AGENTBRIDGE01 to live or grant either endpoint execution authority.

## Mutation law

Consumers resolve `AGENTBRIDGE01` or `AGENTBRIDGE02` through AddressSelf. They do not create a second endpoint registry.

