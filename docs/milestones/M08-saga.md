# M08 — Saga venda ↔ estoque

**Fase:** Consistência  
**Histórias 3–5:** _Vendido · Estoque baixou · Venda cancelada_  
**Status:** pendente

## Problema

Venda no PDV não baixa estoque; cancelamento não estorna.

## Motivação

Coreografia conecta contexts sem HTTP síncrono; compensação reutilizada no sync.

## Objetivo

Histórias 3, 4 e 5 completas e testadas.

## DoD

- Venda confirma → estoque baixa
- Cancelamento → estorno
- Evento duplicado → idempotente

## ADR

- Coreografia vs orquestração → ADR-003 _(se rejeitar orchestrator)_

## Tasks (a detalhar)

- [ ] T001 — Outbox PDV + `pdv.venda.finalizada`
- [ ] T002 — Máquina estados completa
- [ ] T003 — Consumer estoque idempotente
- [ ] T004 — Cancelamento + compensação
- [ ] T005 — Tabela `processamento_evento`
- [ ] T006 — Testes saga

## Diagramas

Ver [ROADMAP — saga](../ROADMAP.md#referência-saga)
