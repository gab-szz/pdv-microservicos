# T003 — Configurar Lucid e migration base

> **Milestone:** M04 · **Status:** pendente · **Depende de:** T002

## Objetivo
Instalar Lucid e provar o ciclo migration/rollback no banco exclusivo do PDV.

## Arquivos
`pdv-microservico/config/database.ts`, `pdv-microservico/database/migrations/`, `pdv-microservico/package.json`

## Pronto quando
- Uma migration base aplica e reverte sem tocar o banco do Estoque.
- O comando de migration está documentado no pacote.

## Verifica
`pnpm --filter pdv-microservico ace migration:run`
