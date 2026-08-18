# T005 — API HTTP de departamentos

> **Milestone:** M01 · **Status:** pendente · **Depende de:** T002, T004

## Objetivo
Fechar os endpoints de departamento com schemas Zod, persistência e testes de integração.

## Arquivos
`estoque-microservico/src/modules/departamento/`, `estoque-microservico/test/integration/src/modules/departamento.test.ts`

## Pronto quando
- Criar, listar, buscar, atualizar e remover departamento têm contratos testados.
- Entradas inválidas retornam erro HTTP sem alcançar o domínio.

## Verifica
`pnpm --filter estoque-microservico test:integration -- departamento`
