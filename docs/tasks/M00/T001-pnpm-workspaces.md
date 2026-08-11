# T001 — Migrar para pnpm workspaces

> **Milestone:** [M00 Monorepo](../milestones/M00-monorepo.md)  
> **Estimativa:** 2–4 horas  
> **Status:** `concluída`

---

## Objetivo

Migrar completamente o monorepo de npm workspaces para **pnpm workspaces**.

> Revisão feita: a migração do workspace foi validada com sucesso no repositório. O comando de desenvolvimento inicia o processo da aplicação, mas a resposta completa da API depende de serviços externos como Postgres/Redis estarem disponíveis no ambiente.

## Contexto

Hoje o projeto usa npm workspaces na raiz. Nas próximas milestones existirão `packages/` compartilhados e mais microserviços. Preciso estabilizar o monorepo antes disso.

## Motivação

`workspace:*` do pnpm cria symlinks previsíveis; é o padrão que documentei no [`shared.md`](../../shared.md) e evita retrabalho ao extrair libs depois.

## Escopo

- [x] Criar `pnpm-workspace.yaml` na raiz
- [x] Ajustar `package.json` root (workspaces npm → scripts pnpm)
- [x] `pnpm install` gerando `pnpm-lock.yaml`
- [x] Validar install nos três workspaces: `estoque-microservico`, `pdv-microservico`, `packages/pdv-schemas`
- [x] Documentar no README raiz o comando `pnpm install`

## Fora do escopo

- Não alterar código de domínio
- Não mudar estrutura hexagonal dos módulos
- Não criar novos packages além dos existentes
- Não configurar GitHub Packages / publish

## Critérios de aceite

- [x] `pnpm-workspace.yaml` lista `packages/*`, `estoque-microservico`, `pdv-microservico`
- [x] `pnpm install` na raiz conclui sem erro
- [x] `ls -l estoque-microservico/node_modules/@gab-szz/pdv-schemas` aponta para `packages/pdv-schemas` (symlink)
- [x] `pnpm --filter estoque-microservico dev` inicia a API
- [x] Lockfile npm root pode ser removido após validação (ou documentar transição)

## Definition of Done

```text
pnpm install
    ↓
sem erros; pnpm-lock.yaml criado
    ↓
pnpm --filter estoque-microservico dev
    ↓
API estoque inicia; resposta completa depende de Postgres/Redis disponíveis
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
