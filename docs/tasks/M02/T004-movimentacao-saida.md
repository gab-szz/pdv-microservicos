# T004 — Saída com saldo suficiente

> **Milestone:** M02 · **Status:** pendente · **Depende de:** T003

## Objetivo
Registrar saída somente quando o saldo suportar a quantidade solicitada.

## Arquivos
`estoque-microservico/src/modules/estoque/`, `estoque-microservico/test/unit/src/modules/estoque/`

## Pronto quando
- Saída válida reduz saldo e gera movimentação.
- Saída acima do saldo é recusada sem gravar alteração parcial.

## Verifica
`pnpm --filter estoque-microservico test:integration -- estoque`
