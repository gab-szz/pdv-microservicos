# T003 — Movimentações de entrada e ajuste

> **Milestone:** M02 · **Status:** pendente · **Depende de:** T001, T002

## Objetivo
Registrar entradas e ajustes com motivo, quantidade e saldo resultante.

## Arquivos
`estoque-microservico/src/modules/estoque/`, `estoque-microservico/src/infra/database/schemas/`

## Pronto quando
- Entrada e ajuste atualizam saldo e deixam histórico imutável.
- Quantidade e motivo são validados na borda HTTP.

## Verifica
`pnpm --filter estoque-microservico test:integration -- estoque`
