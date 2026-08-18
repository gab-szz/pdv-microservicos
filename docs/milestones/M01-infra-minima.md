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

## Tasks

| ID | Task | Status |
| --- | --- | --- |
| [T001](../tasks/M01/T001-postgres-estoque-compose.md) | Postgres de desenvolvimento e scripts de infraestrutura | pendente |
| [T002](../tasks/M01/T002-ambiente-drizzle.md) | Ambiente, migrations e seed de desenvolvimento | pendente |
| [T003](../tasks/M01/T003-health-check.md) | Health check dependente do banco | pendente |
| [T004](../tasks/M01/T004-observabilidade-http.md) | Logs HTTP e tratamento de erros | pendente |
| [T005](../tasks/M01/T005-departamento-http.md) | API HTTP de departamentos | pendente |
| [T006](../tasks/M01/T006-produto-http.md) | API HTTP de produtos | pendente |
| [T007](../tasks/M01/T007-documentacao-subida-local.md) | Guia de subida local | pendente |

## Referências

- [M00](./M00-monorepo.md)
