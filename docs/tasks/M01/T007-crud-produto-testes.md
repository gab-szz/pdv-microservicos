# T007 — CRUD de produto e testes unitários

> **Milestone:** [M01 Infra mínima + estoque base](../../milestones/M01-infra-minima.md)  
> **Estimativa:** 4–8 horas  
> **Status:** `pendente`

## Objetivo

Fechar o fluxo de produto do domínio até HTTP, com persistência real e testes que protejam as regras principais.

## Escopo

- [ ] Confirmar schema e migration da tabela de produto
- [ ] Completar cadastro, consulta por ID, listagem, atualização e exclusão
- [ ] Validar payloads HTTP com Zod e mapear respostas
- [ ] Cobrir regras de domínio com testes unitários
- [ ] Cobrir os endpoints principais com testes de integração
- [ ] Garantir tratamento consistente de produto inexistente e dados inválidos

## Fora do escopo

- Autenticação e autorização
- Reserva de estoque
- Mensageria
- Paginação avançada

## Critérios de aceite

- [ ] CRUD completo funciona contra o Postgres do Compose
- [ ] Produto inválido é rejeitado antes da persistência
- [ ] Consulta e atualização de ID inexistente retornam erro de negócio apropriado
- [ ] Testes unitários e de integração cobrem o fluxo feliz e os principais erros
- [ ] Build do microserviço passa sem erros TypeScript

## Arquivos envolvidos

| Ação | Caminho |
| --- | --- |
| editar | `estoque-microservico/src/modules/produto/**` |
| editar | `estoque-microservico/src/infra/database/schemas/produto.schema.ts` |
| editar | `estoque-microservico/test/unit/src/modules/produto/**` |
| editar | `estoque-microservico/test/integration/src/modules/produto.test.ts` |

## Gate

```text
pnpm --filter estoque-microservico build
pnpm --filter estoque-microservico test
pnpm --filter estoque-microservico test:integration
```
