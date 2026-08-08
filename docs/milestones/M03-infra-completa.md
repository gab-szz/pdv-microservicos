# M03 — Infra completa (compose)

**Fase:** Integração  
**Status:** pendente

## Problema

Próximo passo é mensageria + PDV; falta Rabbit, Redis, postgres-pdv no ambiente.

## Motivação

Expando compose **uma vez** — evito reconfigurar infra a cada milestone.

## Objetivo

`pnpm infra:up` sobe postgres-estoque, postgres-pdv, redis, rabbitmq.

## DoD

- Clone fresco sobe infra sem Postgres local
- Dockerfile multi-stage estoque; profiles `dev` / `infra`

## Tasks (a detalhar)

- [ ] T001 — Adicionar serviços ao compose
- [ ] T002 — `.env.test` + DB `_test`
- [ ] T003 — Dockerfile estoque
- [ ] T004 — Health readiness (db + redis + rabbit)

## Referências

- [M02](./M02-estoque-completo.md)
