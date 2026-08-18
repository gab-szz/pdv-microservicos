# T001 — Postgres de desenvolvimento e scripts

> **Milestone:** M01 · **Status:** pendente

## Objetivo
Subir `postgres-estoque` por Compose e expor scripts root para iniciar e parar a infraestrutura.

## Arquivos
`docker-compose.yml`, `package.json`, `.env.example`

## Pronto quando
- `pnpm infra:up` inicia o PostgreSQL do Estoque.
- A porta, o banco e as credenciais vêm de variáveis documentadas.

## Verifica
`docker compose config`
