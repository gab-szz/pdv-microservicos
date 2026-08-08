# M12 — Observabilidade (OpenTelemetry)

**Fase:** Operação  
**Status:** pendente

## Problema

Fluxos distribuídos difíceis de debugar só com logs locais.

## Motivação

**OpenTelemetry** agora — correlation id já existe desde M04. OTel expande o que já funciona.

## Objetivo

Trace venda/sync end-to-end; métricas HTTP/PG/Rabbit/BullMQ.

## DoD

- Uma venda + sync run visíveis no trace

## Tasks (a detalhar)

- [ ] T001 — OTel SDK serviços
- [ ] T002 — Propagação cross-service
- [ ] T003 — Liveness/readiness todos serviços

## Nota

Correlation id **não** espera este milestone — nasceu em M04.
