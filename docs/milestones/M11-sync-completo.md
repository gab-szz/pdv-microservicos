# M11 — Sync Engine completo

**Fase:** Sincronização  
**História 6:** _O ERP descobriu essa mudança_ (fechamento)  
**Status:** pendente

## Problema

MVP não cobre diff avançado, DLQ por item, histórico, emissão NF.

## Motivação

Fechar entrega principal production-grade para estudo.

## Objetivo

3 estratégias diff; API histórico; cenário completo ERP.

## DoD

- 10 novos + 3 updates + 2 cancel + 1 NF em um run auditável

## ADR

- Cursor/diff/hash → ADR-004, ADR-005 _(alternativas rejeitadas)_

## Tasks (a detalhar)

- [ ] T001 — Diff version + hash
- [ ] T002 — Emissão NF no sync
- [ ] T003 — Lotes + rollback parcial
- [ ] T004 — DLQ `sync:retry-item`
- [ ] T005 — `GET /sync/runs`
- [ ] T006 — Testes cenário completo
