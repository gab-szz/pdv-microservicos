# T006 — Logging estruturado com Pino

> **Milestone:** [M01 Infra mínima + estoque base](../../milestones/M01-infra-minima.md)  
> **Estimativa:** 2–3 horas  
> **Status:** `pendente`

## Objetivo

Substituir logs soltos por logging estruturado e preservar contexto suficiente para diagnosticar requests e falhas de inicialização.

## Escopo

- [ ] Configurar o logger do Fastify com Pino
- [ ] Definir formato legível no desenvolvimento e JSON no ambiente apropriado
- [ ] Registrar início e falha do boot sem expor segredos
- [ ] Garantir que erros do handler mantenham status e contexto úteis
- [ ] Remover `console.log` de fluxos operacionais alterados pela task

## Fora do escopo

- Centralização externa de logs
- Tracing distribuído
- Métricas e alertas

## Critérios de aceite

- [ ] Uma request gera log estruturado com método, rota e status
- [ ] Falhas de conexão no boot aparecem com mensagem e causa
- [ ] `DATABASE_URL`, tokens e credenciais não aparecem nos logs
- [ ] Testes existentes continuam passando

## Arquivos envolvidos

| Ação | Caminho |
| --- | --- |
| editar | `estoque-microservico/src/app.ts` |
| editar | `estoque-microservico/src/server.ts` |
| editar | `estoque-microservico/src/error/*.ts` |
| editar | `estoque-microservico/package.json` |

## Gate

```text
pnpm --filter estoque-microservico build
pnpm --filter estoque-microservico test:integration
```
