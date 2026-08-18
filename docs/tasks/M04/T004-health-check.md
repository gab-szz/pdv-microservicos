# T004 — Health check do PDV

> **Milestone:** M04 · **Status:** pendente · **Depende de:** T002, T003

## Objetivo
Criar `GET /health` no AdonisJS que confirma disponibilidade da aplicação e do PostgreSQL.

## Arquivos
`pdv-microservico/start/routes.ts`, `pdv-microservico/app/controllers/`, `pdv-microservico/tests/functional/`

## Pronto quando
- Banco disponível produz HTTP 200 com estado explícito.
- Banco indisponível não retorna falso positivo.

## Verifica
`pnpm --filter pdv-microservico ace test functional`
