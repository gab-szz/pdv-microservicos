# T007 — Integração da história 1

> **Milestone:** M02 · **Status:** pendente · **Depende de:** T003–T006

## Objetivo
Provar a história “um produto foi criado” até a primeira movimentação de estoque.

## Arquivos
`estoque-microservico/test/integration/src/modules/estoque.test.ts`

## Pronto quando
- O teste cria produto, inicializa estoque e registra entrada e saída.
- O saldo final e o histórico são verificados contra PostgreSQL real.

## Verifica
`pnpm --filter estoque-microservico test:integration`
