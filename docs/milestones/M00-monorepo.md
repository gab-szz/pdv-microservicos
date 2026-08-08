# M00 — Monorepo pnpm

**Fase:** Fundação  
**História:** _(infraestrutura — habilita tudo)_  
**Status:** parcial

## Problema

npm workspaces frágil para `packages/` + microserviços crescendo.

## Motivação

Estabilizo o chão do monorepo **antes** de expandir serviços — [`shared.md`](../../shared.md).

## Objetivo

Workspace pnpm funcional; estoque sobe via `pnpm --filter`.

## Definition of Done

- `pnpm install` na raiz sem erros
- `pnpm --filter estoque-microservico dev` funciona

## Tasks

| ID                                                 | Task                                  | Status   |
| -------------------------------------------------- | ------------------------------------- | -------- |
| [T001](../tasks/M00/T001-pnpm-workspaces.md)       | Migrar para pnpm workspaces           | pendente |
| [T002](../tasks/M00/T002-root-scripts.md)          | Scripts root (`infra:up`, `test:all`) | pendente |
| [T003](../tasks/M00/T003-pdv-schemas-workspace.md) | `pdv-schemas` via `workspace:*`       | pendente |

## Já feito no estoque

- [x] Hexagonal, Zod, Drizzle, erros domínio

## Referências

- [ROADMAP](../ROADMAP.md)
- [shared.md](../../shared.md)
