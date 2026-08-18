# M03 — Infra completa (compose)

**Fase:** Integração  
**Status:** pendente

## Problema

Próximo passo é mensageria + PDV; falta Rabbit, Redis, postgres-pdv no ambiente.

## Motivação

Expando compose **uma vez** — evito reconfigurar infra a cada milestone.

## Objetivo

`pnpm infra:up` sobe postgres-estoque, postgres-pdv, redis, rabbitmq.

## DoD

- Clone fresco sobe infra sem Postgres local
- Dockerfile multi-stage estoque; profiles `dev` / `infra`

## Tasks

| ID | Task | Status |
| --- | --- | --- |
| [T001](../tasks/M03/T001-compose-servicos.md) | Compose com Postgres, Redis e RabbitMQ | pendente |
| [T002](../tasks/M03/T002-ambientes-testes.md) | Variáveis e bancos isolados de teste | pendente |
| [T003](../tasks/M03/T003-dockerfile-estoque.md) | Imagem multi-stage do Estoque | pendente |
| [T004](../tasks/M03/T004-readiness-dependencias.md) | Readiness para banco, Redis e RabbitMQ | pendente |
| [T005](../tasks/M03/T005-guia-infra-local.md) | Guia e smoke test da infraestrutura local | pendente |

## Referências

- [M02](./M02-estoque-completo.md)
