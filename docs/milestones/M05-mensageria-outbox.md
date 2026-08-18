# M05 — RabbitMQ + Outbox + correlation id

**Fase:** Mensageria  
**História 2:** _Esse produto chegou ao PDV_ (infra de eventos)  
**Status:** pendente

## Problema

Dual-write (DB + fila) é frágil; quando consumer falhar, preciso rastrear a mensagem.

## Motivação

- **Outbox + RabbitMQ** = publicação confiável
- **`events-contracts`** nasce junto (payload tipado ao publicar)
- **`traceId` / `correlationId` / `requestId`** desde já — quando o 1º consumer quebrar, agradeço

## Objetivo

Estoque publica `estoque.produto.criado` via outbox; logs correlacionados.

## DoD

- Criar produto → outbox → Rabbit → teste verde
- Headers/logs com correlation id ponta a ponta (API → outbox worker → fila)

## ADR (só se rejeitar alternativa)

- RabbitMQ vs **Redis Streams** vs **Kafka** → [ADR-001](../ADR/001-rabbitmq-eventos.md) _(quando escrito)_
- Outbox vs publish direto → ADR-002

## Tasks (a detalhar)

- [ ] T001 — `packages/events-contracts` v1
- [ ] T002 — Tabela outbox + exchange topic
- [ ] T003 — Worker drain (loop simples; BullMQ em M09)
- [ ] T004 — DLQ + retry Rabbit
- [ ] T005 — Correlation id middleware + propagar em publish
- [ ] T006 — Testes integração Testcontainers + Rabbit

## Referências

- Design Outbox no [ROADMAP](../ROADMAP.md#referência-outbox)
