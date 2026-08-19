# T005 — Migrations, seed e env de desenvolvimento

> **Milestone:** [M01 Infra mínima + estoque base](../../milestones/M01-infra-minima.md)  
> **Estimativa:** 2–4 horas  
> **Status:** `pendente`

## Objetivo

Tornar o banco do estoque inicializável por comandos repetíveis, com variáveis de ambiente documentadas e dados mínimos para desenvolvimento.

## Escopo

- [ ] Criar ou atualizar `.env.example` do estoque sem segredos reais
- [ ] Configurar `db:migrate` usando `MIGRATOR_DATABASE_URL`
- [ ] Criar `db:seed:dev` idempotente para dados mínimos de desenvolvimento
- [ ] Garantir que migrations executam contra o Postgres do Compose
- [ ] Documentar a ordem `infra:up` → `db:migrate` → `db:seed:dev`

## Fora do escopo

- Dados de produção
- Migração automática durante o boot da API
- Redis e mensageria

## Critérios de aceite

- [ ] Um ambiente novo consegue aplicar as migrations com um único comando
- [ ] Rodar o seed duas vezes não cria duplicatas indevidas
- [ ] A API inicia usando o `.env.example` preenchido para desenvolvimento local
- [ ] Os comandos falham com mensagem clara quando as variáveis obrigatórias estão ausentes

## Arquivos envolvidos

| Ação | Caminho |
| --- | --- |
| criar / editar | `estoque-microservico/.env.example` |
| editar | `estoque-microservico/package.json` |
| editar | `estoque-microservico/drizzle.config.ts` |
| criar / editar | `estoque-microservico/src/infra/database/seed.ts` |
| editar | `README.md` |

## Gate

```text
pnpm infra:up
pnpm --filter estoque-microservico db:migrate
pnpm --filter estoque-microservico db:seed:dev
```
