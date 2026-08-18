# T001 — Modelo persistente de estoque

> **Milestone:** M02 · **Status:** pendente · **Depende de:** M01

## Objetivo
Criar a tabela e o adaptador que guardam saldo, mínimo e máximo por produto.

## Arquivos
`estoque-microservico/src/infra/database/schemas/`, `estoque-microservico/src/modules/estoque/`

## Pronto quando
- A migration cria uma única posição de estoque por produto.
- O saldo inicial e limites persistem corretamente.

## Verifica
`pnpm --filter estoque-microservico db:migrate`
