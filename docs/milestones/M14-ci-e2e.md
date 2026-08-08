# M14 — CI/CD + E2E completo

**Fase:** Operação  
**Status:** pendente

## Problema

Tudo funciona local; falta prova automatizada do fluxo crítico completo.

## Motivação

CI com Testcontainers; E2E inclui sync (histórias 1–6 integradas).

## Objetivo

PR quebra se teste falhar; badge README.

## DoD

- GitHub Actions verde
- E2E: ERP → sync → PDV → venda → estoque → cancelamento

## Tasks (a detalhar)

- [ ] T001 — Workflow CI
- [ ] T002 — Docker build por serviço
- [ ] T003 — Suite E2E completa
