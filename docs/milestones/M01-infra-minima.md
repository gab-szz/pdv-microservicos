# M01 — Infra mínima + estoque base

**Fase:** Fundação  
**História 1:** _Um produto foi criado_ (início)  
**Status:** pendente

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

- [ ] T001 — `docker/compose.dev.yml` postgres-estoque
- [ ] T002 — `.env.example` + scripts `db:migrate` / `db:seed:dev`
- [ ] T003 — Health `GET /health` (db)
- [ ] T004 — Pino + Fastify
- [ ] T005 — CRUD Produto + testes unitários
- [ ] T006 — README raiz (como subir)

## Referências

- [M00](./M00-monorepo.md)
