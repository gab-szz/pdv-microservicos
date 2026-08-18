# M04 — Bootstrap do PDV com AdonisJS

**Fase:** Integração  
**História:** _(fundação do consumidor da história 2)_  
**Status:** pendente

## Problema

O PDV ainda é um bootstrap Fastify sem banco, convenções de aplicação ou testes.
Antes de consumir eventos, preciso definir e exercitar o AdonisJS como framework
do segundo microserviço.

## Objetivo

O `pdv-microservico` roda como aplicação AdonisJS com PostgreSQL próprio,
Lucid, health check, testes HTTP e imagem Docker. Não há catálogo, venda nem
RabbitMQ nesta milestone.

## DoD

- `pnpm --filter pdv-microservico dev` inicia o AdonisJS.
- `GET /health` confirma a conexão com `postgres-pdv`.
- Migration do Lucid cria o schema vazio do PDV.
- Teste HTTP do health check executa isoladamente.
- O serviço sobe pela imagem Docker com as variáveis documentadas.

## Tasks

| ID | Task | Status |
| --- | --- | --- |
| [T001](../tasks/M04/T001-bootstrap-adonis.md) | Inicializar o PDV como aplicação AdonisJS | pendente |
| [T002](../tasks/M04/T002-configuracao-ambiente.md) | Configurar ambiente e conexão PostgreSQL | pendente |
| [T003](../tasks/M04/T003-lucid-migrations.md) | Configurar Lucid e migration base | pendente |
| [T004](../tasks/M04/T004-health-check.md) | Implementar health check do PDV | pendente |
| [T005](../tasks/M04/T005-testes-docker.md) | Testes HTTP e imagem Docker do PDV | pendente |

## Fora do escopo

- Consumer RabbitMQ e contratos de eventos (M05 e M06).
- Catálogo local, vendas, pagamentos e caixa (M06+).
- Autenticação (M14).

## Referências

- [M03](./M03-infra-completa.md)
- [M05](./M05-mensageria-outbox.md)
