# T004 — Readiness das dependências

> **Milestone:** M03 · **Status:** pendente · **Depende de:** T001

## Objetivo
Declarar health checks no Compose e readiness da aplicação para banco, Redis e RabbitMQ.

## Arquivos
`docker-compose.yml`, `estoque-microservico/src/`

## Pronto quando
- Serviços dependentes aguardam a infraestrutura estar saudável.
- Falha de dependência é identificável por endpoint ou log estruturado.

## Verifica
`docker compose up --wait`
