# CAPABILITYSELF → ACTUATIONSELF → EFFECTSELF v0.1

## META OURSELFTELLIGENCE

These three primitives form one causal execution membrane:

CAPABILITYSELF
    |
    v
ACTUATIONSELF
    |
    v
EFFECTSELF

They MUST remain separately typed.

CAPABILITYSELF answers:
WHAT operation class is admissible?

ACTUATIONSELF answers:
DID the runtime perform that exact operation?

EFFECTSELF answers:
WHAT observable state changed as a result?

## Request Contract

Every execution request MUST contain:

request_type
target_ref
location_hint
frequency
capability_ref
action_ref

Example:

request_type: CAPABILITY_ACTUATION
target_ref: SELFREALITY#FIRST-ALCHEMY-LAUNCH
location_hint: SELFVEREIGN-ADDRESSELF
frequency: ON_DEMAND
capability_ref: CAPABILITYSELF/WRITE_EFFECT_RECEIPT
action_ref: ACTUATIONSELF/WRITE_EFFECT_RECEIPT

location_hint and frequency are required request-type fields. Neither grants authority.

## Capability

CAPABILITYSELF is a typed declaration of an allowed operation class.

A capability declaration is not possession of the capability and is not authority.

For v0.1:

CAPABILITYSELF/WRITE_EFFECT_RECEIPT

means only:

the runtime may be configured to write a deterministic effect receipt when separately authorized.

## Actuation

ACTUATIONSELF is the execution transition.

The exact action is:

ACTUATIONSELF/WRITE_EFFECT_RECEIPT

It receives a validated capability/action pair and produces a concrete state transition in the designated runtime effect surface.

ACTUATIONSELF MUST NOT infer authority from capability declaration.

## Effect

EFFECTSELF is the postcondition.

The v0.1 effect is:

a concrete JSON effect record exists at the configured effect surface and contains the exact action, target, execution timestamp, and state delta.

Effect existence is evidence of the state transition. It is not authority.

## Constitutional Separations

CAPABILITY != AUTHORITY
CAPABILITY != ACTUATION
ACTUATION != EFFECT
RECEIPT != EFFECT
OBSERVATION != AUTHORITY

## Execution Chain

REQUEST
  ↓
CAPABILITYSELF
  ↓
ADMITTED ACTION SPECIFICATION
  ↓
ACTUATIONSELF
  ↓
STATE TRANSITION
  ↓
EFFECTSELF
  ↓
RECEIPTSELF

A capability without actuation is not execution.
An actuation attempt without an observed postcondition is not a proven effect.
An effect record without provenance is not sufficient evidence.

## v0.1 Boundary

The implementation is deliberately local and deterministic.

No external transport is invoked.
No external node is mutated.
No authority is granted by this membrane.

The first executable proof therefore demonstrates the causal machinery without silently claiming external-world effects.
