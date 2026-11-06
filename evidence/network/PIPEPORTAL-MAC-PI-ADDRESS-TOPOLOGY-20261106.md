# PIPE|PORTAL MAC ↔ PI address and transport topology

**Observed:** 2026-11-06  
**Scope:** Local network address observations and the loopback-only cognition tunnel.

## Address observations

| Node | mDNS identity | LAN address |
|---|---|---|
| Mac | `ourselfmac.local` | `10.0.0.230` |
| SELFPI | `ourselfpimac.local` | `10.0.0.108` |

Both hosts responded to LAN ping. Pi-to-Mac SSH on TCP 22 authenticated with an existing authorized identity. Mac-to-Pi TCP 22 remained filtered / timed out.

## Transport path

The Pi initiates the SSH session to the Mac. Its remote forward binds only to Mac loopback:

```text
Mac 127.0.0.1:11435
    └── SSH reverse forward
        └── Pi 127.0.0.1:11434 (Ollama)
```

Mac-side GET requests to `/api/tags` and `/v1/models` returned HTTP 200 and the SELFPI model inventory. The Mac-side PipePortal process remains on `127.0.0.1:49320`; `/healthz` returned HTTP 200.

The reverse forward is not exposed on either host's LAN interface and does not create public runtime reachability.

## Explicit boundary state

- Independent PORTAL trust root: NOT CONFIGURED.
- Trust bundle: NOT VERIFIED.
- Host-admin pipe: NOT CONFIGURED.
- Direct Mac-to-Pi SSH TCP 22: FILTERED.
- Firewall changes: NONE.
- New keys or root identities generated: NONE.
- Raw SSH shell channel exposed as a PORTAL substitute: NO.

No router, firewall, or network policy mutation was performed. No claim of universal network reachability, independent trust, or administrative admission is made.

**Disposition:** The address topology and Pi-originated loopback reverse-forward path are verified. Authority remains a separate unresolved layer.


## REVERSELF configuration implementation and verification (2026-11-06)

Implemented on OURSELFMAC in `runtime/aetherbridge/`:

- `config/pipeportal-reverself-config.v1.json`: explicit six-fact reconciliation contract and run-change ledger.
- `portal-reverself-preflight.mjs`: live read-only verifier. It reads PipePortal `/healthz`, probes direct OURSELFMAC → OURSELFPIMAC TCP/22 independently of the reverse Ollama tunnel, and emits a six-fact JSON report.
- Report path from this run: `/tmp/portal-rever-self-preflight.json` (ephemeral verification output, not authority evidence).

Six facts observed independently:
1. Independent PORTAL root: **NOT_CONFIGURED**.
2. INPUTSELFTRUSTSELF bundle + authority lineage: **NOT_VERIFIED**.
3. mTLS host-admin pipe: **NOT_CONFIGURED** (reason: `PORTAL_TRUST_UNVERIFIED`).
4. Direct Mac → Pi TCP/22: **FILTERED_OR_UNREACHABLE** (connect timed out). This does not contradict the working reverse Ollama API tunnel.
5. Firewall policy: **NO_CHANGE_BY_THIS_RUN**.
6. New keys/root identities: **NONE_CREATED_BY_THIS_RUN**; no raw SSH shell tunnel created.

Verification:
- PipePortal health: `LIVE`, PID `6056`.
- Preflight correctly returned `FAIL_CLOSED_TRUST_OR_HOST_ADMIN_PRECONDITIONS_UNSATISFIED` and exit code `2`; this is the expected negative result while independent trust evidence is absent.
- Existing AetherBridge + host-admin tests: **45 passed, 0 failed**.
- JavaScript syntax check: passed.

No production trust values were fabricated. No launchd trust environment, service source, firewall, SSH policy, keys, or authority records were mutated. No default-branch update, PR, or merge was performed. Transport remains distinct from trust, admission, and host administration.


### Durable local verification artifacts

- `runtime/aetherbridge/config/pipeportal-reverself-config.v1.json`
  SHA-256: `af3c4fcadcb19ae9e481d65dac27b2bee5d217be3f7b8068e0cb73dfb097b372`
- `runtime/aetherbridge/portal-reverself-preflight.mjs`
  SHA-256: `cb813855008859bccdef19b86aca69b636f016772814b321e447e00faa89ee3a`
- `runtime/aetherbridge/logs/PIPEPORTAL-REVERSELF-PREFLIGHT-20261106.json`
  SHA-256: `cb4afc779457c1e9404607c5bb07ae27cbf8671bc6eb2801a82f5cb8889a91e9`

The report was copied from the live preflight output into the repository evidence log, re-read as JSON, and checked to contain exactly six fact records. The three trust/admin facts remain negative by design; the verifier exits nonzero rather than promote incomplete trust.
