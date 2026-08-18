# T002 — Ambiente, migrations e seed de desenvolvimento

> **Milestone:** M01 · **Status:** pendente · **Depende de:** T001

## Objetivo
Definir o ambiente do Estoque e scripts reprodutíveis para aplicar migrations e popular dados de desenvolvimento.

## Arquivos
`estoque-microservico/.env.example`, `estoque-microservico/package.json`, `estoque-microservico/src/infra/database/`

## Pronto quando
- `db:migrate` aplica as migrations no banco de desenvolvimento.
- `db:seed:dev` cria dados mínimos sem duplicá-los em nova execução.

## Verifica
`pnpm --filter estoque-microservico db:migrate`
