# T006 — API HTTP de produtos

> **Milestone:** M01 · **Status:** pendente · **Depende de:** T002, T004, T005

## Objetivo
Fechar o CRUD de produto, incluindo o vínculo obrigatório ao departamento e as invariantes do domínio.

## Arquivos
`estoque-microservico/src/modules/produto/`, `estoque-microservico/test/unit/`, `estoque-microservico/test/integration/`

## Pronto quando
- Criar, listar, buscar, atualizar e desativar produto funcionam por HTTP.
- `precoVenda >= precoCusto` é recusado de forma consistente.

## Verifica
`pnpm --filter estoque-microservico test:integration -- produto`
