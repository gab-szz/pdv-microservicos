# M06 — PDV mínimo + 1º E2E

**Fase:** Integração  
**História 2:** _Esse produto chegou ao PDV_ (fechamento)  
**Status:** pendente

## Problema

Estoque publica eventos, mas ninguém consome — arquitetura não provada.

## Motivação

**1º fluxo ponta a ponta cedo:** produto → outbox → Rabbit → PDV. Valido desacoplamento antes de saga/sync.

## Objetivo

Segundo microserviço consome catálogo; história 2 completa.

## DoD

- POST produto estoque → PDV reflete catálogo
- Teste integração/E2E local documentado

## Tasks (a detalhar)

- [ ] T001 — Consumer `estoque.produto.criado`
- [ ] T002 — Catálogo local de produtos recebidos
- [ ] T003 — Venda mínima + snapshot produto
- [ ] T004 — Teste E2E história 2

## Referências

- [M05](./M05-mensageria-outbox.md)
