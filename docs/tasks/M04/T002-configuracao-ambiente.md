# T002 — Configurar ambiente e PostgreSQL do PDV

> **Milestone:** M04 · **Status:** pendente · **Depende de:** T001

## Objetivo
Definir validação de ambiente do AdonisJS e conexão exclusiva ao `postgres-pdv`.

## Arquivos
`pdv-microservico/config/`, `pdv-microservico/.env.example`, `docker-compose.yml`

## Pronto quando
- A aplicação falha na inicialização se `DB_*` obrigatório estiver ausente.
- A conexão aponta somente para o banco do PDV.

## Verifica
`pnpm --filter pdv-microservico ace test`
