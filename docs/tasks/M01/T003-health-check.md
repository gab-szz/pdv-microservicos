# T003 — Health check do Estoque

> **Milestone:** M01 · **Status:** pendente · **Depende de:** T002

## Objetivo
Expor `GET /health` que retorna disponibilidade somente quando PostgreSQL estiver acessível.

## Arquivos
`estoque-microservico/src/app.ts`, `estoque-microservico/src/infra/database/`, `estoque-microservico/test/integration/`

## Pronto quando
- Com banco disponível, responde HTTP 200.
- Sem banco, responde indisponibilidade sem mascarar a falha.

## Verifica
`pnpm --filter estoque-microservico test:integration -- --runInBand`
