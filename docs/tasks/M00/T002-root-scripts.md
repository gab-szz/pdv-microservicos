# T002 — Scripts root do monorepo

> **Milestone:** [M00 Monorepo](../milestones/M00-monorepo.md)  
> **Estimativa:** 2–3 horas  
> **Status:** `pendente`

---

## Objetivo

Criar scripts na raiz do monorepo para operação repetível (dev, test, infra).

## Contexto

Após T001, o pnpm funciona na raiz. Falta uma interface única para comandos cross-workspace — padrão de equipes com monorepo.

## Motivação

Evito memorizar `--filter` em todo milestone; preparo `pnpm test:all` e `pnpm infra:up` para M01+.

## Escopo

- [ ] `package.json` root: `dev:estoque`, `test:all`, `build:all`, `infra:up` (stub ou real)
- [ ] `infra:up` pode ser placeholder apontando para compose (M01 implementa compose)
- [ ] Documentar scripts no README raiz

## Fora do escopo

- Docker compose completo (M01)
- CI GitHub Actions (M14)

## Critérios de aceite

- [ ] `pnpm test:all` roda testes dos workspaces que têm script `test`
- [ ] `pnpm dev:estoque` equivale a `pnpm --filter estoque-microservico dev`
- [ ] README lista cada script e o que faz

## Definition of Done

```text
pnpm test:all
    ↓
executa vitest do estoque (ou skip gracioso no pdv vazio)
    ↓
pnpm dev:estoque
    ↓
API sobe
```

## Arquivos envolvidos

| Ação   | Caminho               |
| ------ | --------------------- |
| editar | `package.json` (root) |
| editar | `README.md` (root)    |

## Referências

- [T001](./T001-pnpm-workspaces.md)
- [M01](../milestones/M01-infra-minima.md) — `infra:up` evolui lá

## Aprendizados esperados

- Como `pnpm -r` / `--filter` compõem scripts root
- Por que monorepos expõem comandos na raiz

## Observações

—
