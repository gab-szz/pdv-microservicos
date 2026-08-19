# M01 — Infra mínima + estoque base

**Fase:** Fundação  
**História 1:** _Um produto foi criado_ (início)  
**Status:** em andamento

## Problema

Sem Postgres reproduzível; CRUD produto incompleto.

## Motivação

Fecho o mínimo operacional antes de domínio pesado ou segundo serviço.

## Objetivo

Estoque roda com docker (postgres-estoque) + CRUD produto + logs.

## DoD

- `docker compose up` sobe postgres-estoque
- CRUD departamento + produto; testes unit domínio verdes

## Tasks (a detalhar)

- [ ] [T004](../tasks/M00/T004-infra-minima-health.md) — Infra mínima + health (validar runtime e documentar)
- [ ] [T005](../tasks/M01/T005-migrations-seed-env.md) — Migrations, seed e env de desenvolvimento
- [ ] [T006](../tasks/M01/T006-logging-pino-fastify.md) — Logging estruturado com Pino
- [ ] [T007](../tasks/M01/T007-crud-produto-testes.md) — CRUD de produto e testes unitários
- [ ] [T008](../tasks/M01/T008-readme-operacional.md) — README operacional do estoque

## Referências

- [M00](./M00-monorepo.md)
