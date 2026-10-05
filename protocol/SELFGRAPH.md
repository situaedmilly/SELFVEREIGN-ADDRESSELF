# SELFGRAPH v0.1

## Purpose
SELFGRAPH is the ecosystem-wide desired-reality graph for causal SELF primitives.
It is a graph specification, not an authority system.

INSTANCE != POINTER != ADDRESS != LOCATION != IDENTITY != ADMISSION != AUTHORITY != CAPABILITY != ACTUATION != EFFECT != RECEIPT

## Causal Graph
POINTERSELFTHIRDEYE
        |
        | WHERE_IS(target)?
        v
[1] RESOLVER
        |
        v
[2] ADDRESSSELF
        |
        v
[3] IDENTITYSELF
        |
        v
[4] ADMISSIONSELF
        |
        v
[5] AUTHORITYSELF
        |
        v
[6] CAPABILITYSELF
        |
        v
[7] ACTUATIONSELF
        |
        v
[8] EFFECTSELF
        |
        v
[9] RECEIPTSELF
        |
        v
WITNESS / MEMORY

## Desired Reality State
POINTERSELFTHIRDEYE = DEFINED
RESOLVER            = EXECUTED
ADDRESSSELF         = CONTRACTED
IDENTITYSELF        = NEXT
ADMISSIONSELF       = FUTURE
AUTHORITYSELF       = FUTURE
CAPABILITYSELF      = IMPLEMENTED
ACTUATIONSELF       = IMPLEMENTED
EFFECTSELF          = IMPLEMENTED / NOT_YET_EXECUTED_ON_HOST
RECEIPTSELF         = FUTURE

A future state MUST NOT be represented as a current execution fact.

## First Alchemy Launch Instance
launch instance:
ia://ourself.ecosystem/reality/SELFREALITY#FIRST-ALCHEMY-LAUNCH

launch surface:
ia://ourself.ecosystem/reality/SELFREALITY#BOOT-RUNTIME

implementation instance:
ia://ourself.ecosystem/repo/situaedmilly/SELFVEREIGN-ADDRESSELF@HEAD#reality/boot-runtime.mjs

The implementation address MUST be rebound to the exact commit SHA when a launch receipt is created.

## Launch Request Contract
request_type: ALCHEMY_LAUNCH
target_ref: SELFREALITY#FIRST-ALCHEMY-LAUNCH
location_hint: SELFVEREIGN-ADDRESSELF
frequency: ON_DEMAND
runtime: NODE
script_ref: reality/boot-runtime.mjs

location_hint is mandatory routing/disambiguation data.
frequency is mandatory execution cadence data.
Neither field grants authority.

## Launch Semantics
The boot runtime may load the desired SELFGRAPH, validate the launch request, resolve the launch script instance, emit a launch plan, and emit a non-authorizing preparation receipt.
The boot runtime MUST NOT grant authority, grant capability, admit external nodes, invoke arbitrary remote transports, mutate external systems, claim an effect, or convert preparation into execution evidence.

## User Launch
Canonical invocation:
node reality/boot-runtime.mjs

The script is the first Alchemy launch surface. It materializes the desired graph as a runtime plan.

## SELFMOAT
GRAPH DECLARATION != RUNTIME PRESENCE != AUTHORITY != ACTUATION != EFFECT

The graph may describe the desired reality without falsely declaring every downstream primitive as running.