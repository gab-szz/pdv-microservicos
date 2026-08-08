# Architecture Decision Records (ADR)

Registro das **minhas decisões arquiteturais** — o que escolhi, por quê, e o que descartei.

## Regra principal

**Só escrevo ADR quando rejeitei pelo menos uma alternativa séria.**

| Situação                                                   | Ação             |
| ---------------------------------------------------------- | ---------------- |
| Comparei Rabbit vs Redis Streams vs Kafka e escolhi Rabbit | ADR              |
| “Usei Outbox porque o ROADMAP manda”                       | Journal, não ADR |
| Implementação óbvia sem trade-off                          | Nada             |

## Formato

Copio [`TASK-TEMPLATE.md`](../TASK-TEMPLATE.md) não — uso o template abaixo em `docs/ADR/NNN-titulo.md`.

```markdown
# ADR-NNN: Título

**Status:** proposta | aceita | substituída  
**Data:** YYYY-MM-DD  
**Milestone:** MXX

## Contexto

## Alternativas consideradas

| Alternativa | Prós | Contras | Por que não |
| ----------- | ---- | ------- | ----------- |

## Decisão

## Consequências
```

## ADRs planejados

| ID  | Título                           | Milestone | Alternativas a comparar |
| --- | -------------------------------- | --------- | ----------------------- |
| 001 | RabbitMQ para eventos de domínio | M04       | Redis Streams, Kafka    |
| 002 | Outbox Pattern                   | M04       | Publish direto, CDC     |
| 003 | Saga por coreografia             | M07       | Orquestrador central    |
| 004 | Cursor e diff no sync            | M11       | Polling vs webhook      |
| 005 | Timestamp vs version vs hash     | M11       | Só timestamp            |

## ADRs escritos

_(nenhum ainda)_
