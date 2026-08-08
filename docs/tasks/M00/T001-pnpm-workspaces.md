# T001 — Migrar para pnpm workspaces

> **Milestone:** [M00 Monorepo](../milestones/M00-monorepo.md)  
> **Estimativa:** 2–4 horas  
> **Status:** `pendente`

---

## Objetivo

Migrar completamente o monorepo de npm workspaces para **pnpm workspaces**.

## Contexto

Hoje o projeto usa npm workspaces na raiz. Nas próximas milestones existirão `packages/` compartilhados e mais microserviços. Preciso estabilizar o monorepo antes disso.

## Motivação

`workspace:*` do pnpm cria symlinks previsíveis; é o padrão que documentei no [`shared.md`](../../shared.md) e evita retrabalho ao extrair libs depois.

## Escopo

- [ ] Criar `pnpm-workspace.yaml` na raiz
- [ ] Ajustar `package.json` root (workspaces npm → scripts pnpm)
- [ ] `pnpm install` gerando `pnpm-lock.yaml`
- [ ] Validar install nos três workspaces: `estoque-microservico`, `pdv-microservico`, `packages/pdv-schemas`
- [ ] Documentar no README raiz o comando `pnpm install`

## Fora do escopo

- Não alterar código de domínio
- Não mudar estrutura hexagonal dos módulos
- Não criar novos packages além dos existentes
- Não configurar GitHub Packages / publish

## Critérios de aceite

- [ ] `pnpm-workspace.yaml` lista `packages/*`, `estoque-microservico`, `pdv-microservico`
- [ ] `pnpm install` na raiz conclui sem erro
- [ ] `ls -l estoque-microservico/node_modules/@gab-szz/pdv-schemas` aponta para `packages/pdv-schemas` (symlink)
- [ ] `pnpm --filter estoque-microservico dev` inicia a API
- [ ] Lockfile npm root pode ser removido após validação (ou documentar transição)

## Definition of Done

```text
pnpm install
    ↓
sem erros; pnpm-lock.yaml criado
    ↓
pnpm --filter estoque-microservico dev
    ↓
API estoque responde normalmente
```

## Arquivos envolvidos

| Ação             | Caminho                                                              |
| ---------------- | -------------------------------------------------------------------- |
| criar            | `pnpm-workspace.yaml`                                                |
| editar           | `package.json` (root)                                                |
| editar           | `estoque-microservico/package.json` (dep `workspace:*` se aplicável) |
| editar           | `README.md` (root)                                                   |
| remover/opcional | `package-lock.json` (root) após validação                            |

## Referências

- [ROADMAP](../ROADMAP.md)
- [M00](../milestones/M00-monorepo.md)
- [shared.md — fase A](../../shared.md)

## Aprendizados esperados

Ao terminar esta task eu devo entender:

- O que `pnpm-workspace.yaml` declara e por quê
- Como `workspace:*` resolve pacotes (symlink vs download)
- Diferença prática pnpm vs npm workspaces (hoisting, lockfile)
- Por que importar `@scope/pkg` em vez de path relativo `../../packages`

## Observações

Manter `.npmrc` existente para `@gab-szz` registry se ainda consumir do GitHub em algum pacote — não conflitar com workspace local.
