# T005 — Exclusão lógica de produto

> **Milestone:** M02 · **Status:** pendente · **Depende de:** M01

## Objetivo
Desativar produtos sem apagar histórico de estoque e movimentações.

## Arquivos
`estoque-microservico/src/modules/produto/`, `estoque-microservico/src/infra/database/`

## Pronto quando
- Produto desativado não aparece na listagem padrão.
- Histórico e relações persistem após a desativação.

## Verifica
`pnpm --filter estoque-microservico test:integration -- produto`
