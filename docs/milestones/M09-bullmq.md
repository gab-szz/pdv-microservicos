# M09 — BullMQ + workers

**Fase:** Mensageria  
**Status:** pendente

## Problema

Drain outbox no runtime da API não escala; sync precisará retry com backoff.

## Motivação

**BullMQ + Redis** quando outbox e saga já existem — uso concreto imediato.

## Objetivo

`estoque-worker`, `pdv-worker`; fila `outbox:publish`; Redis infra ativa.

## DoD

- API rápida; outbox drena no worker; retry com backoff

## Tasks (a detalhar)

- [ ] T001 — Migrar drain outbox → BullMQ
- [ ] T002 — Processos worker separados
- [ ] T003 — Filas adicionais (IA, alertas — opcional)
- [ ] T004 — Testes integração Redis

## Referências

- [M05](./M05-mensageria-outbox.md)
