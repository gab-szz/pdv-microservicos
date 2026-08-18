# T002 — Domínio de saldo e limites

> **Milestone:** M02 · **Status:** pendente · **Depende de:** T001

## Objetivo
Modelar regras de saldo não negativo e limites mínimo/máximo no domínio de Estoque.

## Arquivos
`estoque-microservico/src/modules/estoque/`, `estoque-microservico/test/unit/src/modules/estoque/`

## Pronto quando
- O domínio rejeita saldo negativo e mínimo maior que máximo.
- Testes unitários cobrem limites e transições válidas.

## Verifica
`pnpm --filter estoque-microservico test -- --runInBand`
