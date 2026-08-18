# M11 — Sync Engine MVP

**Fase:** Sincronização  
**História 6:** _O ERP descobriu essa mudança_ (início)  
**Status:** pendente

## Problema

Pedidos nascem no ERP simulado; PDV não reflete origem externa.

## Motivação

Maior entrega do portfólio — **MVP primeiro**: cursor, insert/update/cancel, idempotência.

## Objetivo

Pipeline FETCH → DIFF (timestamp) → APPLY → CHECKPOINT funcional.

## DoD

- ERP seed → sync run → PDV reflete; re-run idempotente
- `sync_run`, `sync_error`, `sync_idempotency`

## Tasks (a detalhar)

- [ ] T001 — postgres-erp + postgres-sync no compose
- [ ] T002 — `erp-simulator` + seed
- [ ] T003 — `sync-engine` api + worker
- [ ] T004 — Pipeline MVP + BullMQ `sync:run`
- [ ] T005 — Testes integração + idempotência

## Referências

- [ROADMAP — Sync Engine](../ROADMAP.md#referência-sync-engine)
