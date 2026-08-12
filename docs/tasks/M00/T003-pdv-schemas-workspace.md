# T003 — pdv-schemas via workspace

> **Milestone:** [M00 Monorepo](../milestones/M00-monorepo.md)  
> **Estimativa:** 2–3 horas  
> **Status:** `pendente`

---

## Objetivo

Garantir que `estoque-microservico` consome `@gab-szz/pdv-schemas` via `workspace:*` (link local).

## Contexto

O pacote `packages/pdv-schemas` já existe. O estoque pode estar resolvendo via registry npm (`"*"`). Preciso alinhar ao fluxo workspace da fase A do `shared.md`.

## Motivação

Validar o ciclo build → consumo local antes de criar `domain-errors` e outros packages.

## Escopo

- [x] `estoque-microservico/package.json`: `"@gab-szz/pdv-schemas": "workspace:*"`
- [x] Build do pacote: `pnpm --filter @gab-szz/pdv-schemas build`
- [x] Import no estoque continua funcionando
- [x] Confirmar symlink em `node_modules`

## Fora do escopo

- GitHub Packages publish
- Extrair domain-errors (M06)

## Critérios de aceite

- [x] Symlink correto após `pnpm install`
- [x] Alterar export em `pdv-schemas`, rebuild, estoque vê mudança
- [x] Zero import `../../packages/...`

## Definition of Done

```text
pnpm --filter @gab-szz/pdv-schemas build
    ↓
pnpm --filter estoque-microservico dev
    ↓
rotas que usam idSchema funcionam
```

## Arquivos envolvidos

| Ação   | Caminho                                               |
| ------ | ----------------------------------------------------- |
| editar | `estoque-microservico/package.json`                   |
| editar | `packages/pdv-schemas/package.json` (se name/exports) |

## Referências

- [shared.md — fase A](../../shared.md)

## Aprendizados esperados

- Fluxo build de lib TypeScript + consumo ESM no microserviço
- Quando preciso rebuildar a lib vs hot reload do serviço

## Observações

Se `@gab-szz` registry conflitar, priorizar workspace local para dev; registry fica para fase C.
