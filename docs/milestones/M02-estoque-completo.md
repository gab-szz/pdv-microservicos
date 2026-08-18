# M02 — Estoque completo + Testcontainers

**Fase:** Domínio  
**História 1:** _Um produto foi criado_ (fechamento)  
**Status:** pendente

## Problema

Bounded context incompleto; testes integração manuais ou mockados.

## Motivação

**Testcontainers** entra quando preciso provar HTTP + Postgres de verdade — não antes.

## Objetivo

Estoque autocontido: estoque, movimentação, regras, suite integração.

## DoD

- API estoque fechada; Testcontainers verde local

## Tasks

| ID | Task | Status |
| --- | --- | --- |
| [T001](../tasks/M02/T001-modelo-estoque.md) | Modelo persistente de estoque e saldo inicial | pendente |
| [T002](../tasks/M02/T002-dominio-estoque.md) | Domínio de saldo, mínimo e máximo | pendente |
| [T003](../tasks/M02/T003-movimentacao-entrada-ajuste.md) | Movimentações de entrada e ajuste | pendente |
| [T004](../tasks/M02/T004-movimentacao-saida.md) | Saída com proteção contra saldo insuficiente | pendente |
| [T005](../tasks/M02/T005-soft-delete-produto.md) | Exclusão lógica de produto | pendente |
| [T006](../tasks/M02/T006-testcontainers-postgres.md) | Fixture de PostgreSQL com Testcontainers | pendente |
| [T007](../tasks/M02/T007-integracao-estoque.md) | Suite de integração da história 1 | pendente |

## Referências

- [M01](./M01-infra-minima.md)
