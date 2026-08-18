# T004 — Logs HTTP e tratamento de erros

> **Milestone:** M01 · **Status:** pendente

## Objetivo
Configurar Pino e o handler HTTP para registrar falhas sem expor detalhes internos ao cliente.

## Arquivos
`estoque-microservico/src/app.ts`, `estoque-microservico/src/error/`

## Pronto quando
- Cada requisição tem log estruturado com método, rota, status e duração.
- Erro de validação e regra de negócio têm resposta HTTP consistente.

## Verifica
`pnpm --filter estoque-microservico build`
