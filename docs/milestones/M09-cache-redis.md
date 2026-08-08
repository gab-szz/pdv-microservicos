# M09 — Cache Redis

**Fase:** Consistência  
**Status:** pendente

## Problema

GET produto e catálogo PDV repetem Postgres após eventos.

## Motivação

Cache **depois** de invalidação via eventos — senão é chute.

## Objetivo

Hit/miss/invalidação testados.

## DoD

- Segunda leitura cache hit; update invalida

## Tasks (a detalhar)

- [ ] T001 — Cache `produto:{id}` estoque
- [ ] T002 — Invalidação update/delete/evento
- [ ] T003 — Cache catálogo PDV
- [ ] T004 — Testes
