# Milestones — índice

Cada milestone é uma entrega demonstrável. Tasks ficam em [`../tasks/`](../tasks/).

## Fases

| Fase              | Milestones | Foco                                               |
| ----------------- | ---------- | -------------------------------------------------- |
| **Fundação**      | M00, M01   | Monorepo + infra mínima                            |
| **Domínio**       | M02, M07       | Estoque fechado; Shared Kernel **após** duplicação    |
| **Integração**    | M03, M04, M06  | Compose; bootstrap AdonisJS; PDV + 1º E2E            |
| **Mensageria**    | M05, M09       | Outbox, Rabbit, correlation id; BullMQ                |
| **Consistência**  | M08, M10       | Saga; cache                                           |
| **Sincronização** | M11, M12       | Sync Engine MVP + completo                            |
| **Operação**      | M13–M16        | OTel, auth, CI, produção                              |

## Histórias de negócio → milestones

| #   | História                     | Milestone(s) |
| --- | ---------------------------- | ------------ |
| 1   | Um produto foi criado        | M01, M02     |
| 2   | Esse produto chegou ao PDV   | M04–M06     |
| 3   | Esse produto foi vendido     | M08         |
| 4   | O estoque baixou             | M08         |
| 5   | A venda foi cancelada        | M08         |
| 6   | O ERP descobriu essa mudança | M11, M12    |

## Lista

| ID                                | Milestone                          | Fase          | Status   |
| --------------------------------- | ---------------------------------- | ------------- | -------- |
| [M00](./M00-monorepo.md)          | Monorepo pnpm                      | Fundação      | parcial  |
| [M01](./M01-infra-minima.md)      | Infra mínima + estoque base        | Fundação      | pendente |
| [M02](./M02-estoque-completo.md)  | Estoque completo + Testcontainers  | Domínio       | pendente |
| [M03](./M03-infra-completa.md)    | Infra completa (compose)           | Integração    | pendente |
| [M04](./M04-pdv-adonisjs.md)      | Bootstrap do PDV com AdonisJS      | Integração    | pendente |
| [M05](./M05-mensageria-outbox.md) | RabbitMQ + Outbox + correlation id | Mensageria    | pendente |
| [M06](./M06-pdv-primeiro-e2e.md)  | PDV mínimo + 1º E2E                | Integração    | pendente |
| [M07](./M07-shared-kernel.md)     | Shared Kernel (extrair após dor)   | Domínio       | pendente |
| [M08](./M08-saga.md)              | Saga venda ↔ estoque               | Consistência  | pendente |
| [M09](./M09-bullmq.md)            | BullMQ + workers                   | Mensageria    | pendente |
| [M10](./M10-cache-redis.md)       | Cache Redis                        | Consistência  | pendente |
| [M11](./M11-sync-mvp.md)          | Sync Engine MVP                    | Sincronização | pendente |
| [M12](./M12-sync-completo.md)     | Sync Engine completo               | Sincronização | pendente |
| [M13](./M13-observabilidade.md)   | OpenTelemetry + ops                | Operação      | pendente |
| [M14](./M14-autenticacao.md)      | Autenticação                       | Operação      | pendente |
| [M15](./M15-ci-e2e.md)            | CI/CD + E2E completo               | Operação      | pendente |
| [M16](./M16-producao.md)          | Produção simulada                  | Operação      | pendente |

## Fluxo de trabalho

```mermaid
flowchart LR
  R[ROADMAP] --> M[Milestone]
  M --> T[Tasks 2-6h]
  T --> PR[PR / commit]
  PR --> ADR{Decisão real?}
  ADR -->|sim| A[ADR]
  ADR -->|não| J[Journal]
  A --> J
  PR --> J
```
