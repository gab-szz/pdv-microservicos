# M07 — Shared Kernel (extrair após dor)

**Fase:** Domínio  
**Status:** pendente

## Problema

**Agora existe duplicação:** estoque e PDV repetem erros, VOs ou primitivos — ou estou prestes a copiar `ErroRegraNegocio` e `Preco`.

## Motivação

Extraio porque **doeu**, não porque previ. Princípio DDD: abstração surge da repetição.

> _Antes estava cedo (M03). Movi para depois do PDV (M06)._

## Objetivo

`packages/domain-errors`, `packages/money`; zero path relativo; dois consumidores reais.

## DoD

- Estoque + PDV importam `@scope/domain-errors` e `@scope/money`
- Decisão documentada: o que **não** entrou no kernel

## Fora do escopo (por enquanto)

- `events-contracts` (já em M05)
- `@scope/shared` genérico

## Tasks (a detalhar)

- [ ] T001 — Extrair `ErroRegraNegocio` → domain-errors
- [ ] T002 — Extrair `Preco` → money
- [ ] T003 — Refatorar imports estoque + PDV
- [ ] T004 — Testes unitários das libs

## Referências

- [shared.md](../../shared.md)
- [M06](./M06-pdv-primeiro-e2e.md)
