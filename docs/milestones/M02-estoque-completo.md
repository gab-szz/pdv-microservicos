# M02 — Estoque completo + Testcontainers

**Fase:** Domínio  
**História 1:** _Um produto foi criado_ (fechamento)  
**Status:** pendente

## Problema

Bounded context incompleto; testes integração manuais ou mockados.

## Motivação

**Testcontainers** entra quando preciso provar HTTP + Postgres de verdade — não antes.

## Objetivo

Estoque autocontido: estoque, movimentação, regras, suite integração.

## DoD

- API estoque fechada; Testcontainers verde local

## Tasks (a detalhar)

- [ ] T001 — Módulo Estoque (qtd, mín/máx)
- [ ] T002 — Movimentação entrada/saída/ajuste
- [ ] T003 — Regra saída ≤ saldo
- [ ] T004 — Soft delete
- [ ] T005 — Testcontainers Postgres
- [ ] T006 — Seed dev

## Referências

- [M01](./M01-infra-minima.md)
