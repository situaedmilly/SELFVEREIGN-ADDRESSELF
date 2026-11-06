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
