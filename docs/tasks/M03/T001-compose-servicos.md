# T001 — Compose com serviços de infraestrutura

> **Milestone:** M03 · **Status:** pendente · **Depende de:** M02

## Objetivo
Expandir o Compose para PostgreSQL do PDV, Redis e RabbitMQ, preservando o banco isolado do Estoque.

## Arquivos
`docker-compose.yml`, `.env.example`

## Pronto quando
- Um único comando sobe `postgres-estoque`, `postgres-pdv`, Redis e RabbitMQ.
- Cada banco possui volume e credenciais independentes.

## Verifica
`docker compose config`
