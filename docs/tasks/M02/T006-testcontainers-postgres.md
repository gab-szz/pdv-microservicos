# T006 — Fixture PostgreSQL com Testcontainers

> **Milestone:** M02 · **Status:** pendente · **Depende de:** T001

## Objetivo
Substituir dependência de banco local por fixture de PostgreSQL efêmera para testes de integração.

## Arquivos
`estoque-microservico/test/integration/`, `estoque-microservico/package.json`

## Pronto quando
- A suite cria banco isolado, aplica migrations e o encerra ao final.
- Nenhum teste depende do PostgreSQL de desenvolvimento.

## Verifica
`pnpm --filter estoque-microservico test:integration`
