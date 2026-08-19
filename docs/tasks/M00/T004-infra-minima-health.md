# T004 — Infra mínima + health

> **Milestone:** [M01 Infra mínima + estoque base](../milestones/M01-infra-minima.md)
> **Estimativa:** 2–4 horas
> **Status:** `em andamento`

---

## Objetivo

Subir a infraestrutura mínima do projeto (Postgres do estoque) e expor um endpoint de saúde que confirme que a API e o banco estão funcionando juntos.

## Contexto

O monorepo já tem o workspace e a lib compartilhada funcionando. O próximo passo real é garantir que a aplicação consiga rodar em ambiente reproducível com banco real e que o serviço responda de forma confiável.

## Motivação

Sem infraestrutura real, não há como validar o fluxo completo de backend: conexão, migração, health, CRUD e testes. Esta task é a base de todas as próximas features e evita que o projeto fique preso em configuração teórica.

## Escopo

- [x] Definir o serviço Postgres do estoque no `docker-compose.yml`
- [x] Garantir que `pnpm infra:up` sobe a infraestrutura mínima
- [x] Configurar env do microserviço para conectar ao Postgres
- [ ] Validar em runtime que o endpoint responde `200` quando o banco está disponível
- [ ] Documentar o comando de subida da infra no README raiz

## Fora do escopo

- CRUD completo de produto
- Docker compose para redis/rabbitmq
- CI/CD
- observabilidade avançada
- autenticação

## Critérios de aceite

- [x] `pnpm infra:up` está configurado para levantar o Postgres do estoque
- [ ] A aplicação consegue conectar no banco sem erro de credenciais/host/porta em execução
- [ ] `GET /health` retorna status HTTP `200` em execução
- [x] O payload de health informa que a API está saudável e o banco está disponível
- [ ] O processo de subida da infraestrutura é documentado em um comando único no README

## Definition of Done

```text
pnpm infra:up
    ↓
Postgres do estoque sobe em container
    ↓
pnpm --filter estoque-microservico dev
    ↓
API inicia com conexão ao banco válida
    ↓
GET /health
    ↓
200 OK + estado da conexão
```

## Arquivos envolvidos

| Ação           | Caminho                                  |
| -------------- | ---------------------------------------- |
| criar / editar | `docker-compose.yml`                     |
| editar         | `package.json` (root)                    |
| editar         | `estoque-microservico/src/config/env.ts` |
| editar         | `estoque-microservico/src/app.ts`        |
| editar         | `estoque-microservico/src/server.ts`     |
| editar         | `README.md` (root)                       |

## Referências

- [M01 Infra mínima + estoque base](../milestones/M01-infra-minima.md)
- [T002 — Scripts root do monorepo](./T002-root-scripts.md)
- [T003 — pdv-schemas via workspace](./T003-pdv-schemas-workspace.md)
- [shared.md](../../shared.md)

## Aprendizados esperados

Ao terminar esta task eu devo entender:

- como o compose do projeto representa a infraestrutura mínima
- como expor health check em Fastify/Node com verificação de banco
- como tratar envs e conexão em um microserviço real
- como validar uma feature com evidência prática, sem depender só de configuração

## Observações

Esta task é a primeira que entrega valor operacional real: a aplicação deixa de depender só de “sala de aula” e passa a ter um ambiente executável de verdade.

## Evidências atuais

- `containers/docker-compose.yml` define o serviço `postgres_estoque` no profile `infra`.
- O script root `pnpm infra:up` ativa esse profile explicitamente.
- `src/config/env.ts`, `src/server.ts` e `src/infra/database/postres.drizzle.ts` estão preparados para validar a conexão.
- `src/app.ts` implementa `200` com banco ativo e `503` quando a conexão falha.
- Ainda falta executar o fluxo completo com Docker + API e registrar o comando no README raiz.
