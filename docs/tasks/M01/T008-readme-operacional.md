# T008 — README operacional do estoque

> **Milestone:** [M01 Infra mínima + estoque base](../../milestones/M01-infra-minima.md)  
> **Estimativa:** 1–2 horas  
> **Status:** `pendente`

## Objetivo

Permitir que outra pessoa suba, valide e pare o ambiente do estoque seguindo o README raiz, sem depender de contexto oral.

## Escopo

- [ ] Documentar pré-requisitos: Node, pnpm, Docker e Docker Compose
- [ ] Documentar `pnpm install`
- [ ] Documentar `pnpm infra:up` e `pnpm infra:down`
- [ ] Documentar migrations, seed e inicialização da API
- [ ] Documentar `GET /health` e o resultado esperado
- [ ] Documentar comandos de build e testes

## Fora do escopo

- Manual completo da API
- Deploy em nuvem
- Configuração de CI/CD

## Critérios de aceite

- [ ] O fluxo de desenvolvimento aparece em uma sequência copiável
- [ ] Portas e variáveis necessárias estão explícitas
- [ ] O README diferencia comandos da raiz e do workspace do estoque
- [ ] Uma pessoa sem contexto do projeto consegue validar o health seguindo o documento

## Arquivos envolvidos

| Ação | Caminho |
| --- | --- |
| editar | `README.md` |
| editar | `estoque-microservico/README.md` (se necessário) |

## Gate

```text
pnpm infra:up
pnpm --filter estoque-microservico build
```
