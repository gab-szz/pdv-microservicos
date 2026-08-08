# Architecture Decision Records (ADR)

Registro curto das **minhas decisões arquiteturais** — o que escolhi, por quê, e o que descartei.

Evito reabrir debates já resolvidos e documento trade-offs para quem for ler o repositório.

## Quando escrevo um ADR

- Escolha de broker (RabbitMQ vs Kafka vs Redis Pub/Sub)
- Outbox vs publish direto
- Estratégia de cursor/diff no sync engine
- Coreografia vs orquestração na saga
- 1 banco por serviço vs shared DB

## Formato

Copio o template abaixo para `docs/ADR/NNN-titulo-curto.md`.

```markdown
# ADR-NNN: Título da decisão

**Status:** proposta | aceita | substituída por ADR-XXX  
**Data:** YYYY-MM-DD  
**Contexto:** Onda X do ROADMAP

## Contexto

Por que precisei decidir isso? Qual trade-off estava em jogo?

## Decisão

O que escolhi?

## Consequências

### Positivas

- ...

### Negativas / custo

- ...

## Alternativas que descartei

| Alternativa | Por que não |
| ----------- | ----------- |
| ...         | ...         |
```

## ADRs que pretendo escrever

| ID  | Título                                              | Onda |
| --- | --------------------------------------------------- | ---- |
| 001 | RabbitMQ vs Redis Pub/Sub para eventos de domínio   | 4    |
| 002 | Outbox Pattern para publicação confiável            | 4    |
| 003 | Saga por coreografia (venda ↔ estoque)              | 6    |
| 004 | Cursor e estratégia de diff no sync engine          | 7    |
| 005 | Timestamp vs version vs hash para detectar mudanças | 7    |
