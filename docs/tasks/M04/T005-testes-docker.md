# T005 — Testes HTTP e imagem Docker do PDV

> **Milestone:** M04 · **Status:** pendente · **Depende de:** T003, T004

## Objetivo
Fechar o bootstrap com teste HTTP reprodutível e uma imagem Docker de execução do PDV.

## Arquivos
`pdv-microservico/tests/`, `pdv-microservico/Dockerfile`, `pdv-microservico/.dockerignore`

## Pronto quando
- O teste de health check usa banco isolado e passa.
- A imagem inicia o servidor AdonisJS com variáveis externas.

## Verifica
`pnpm --filter pdv-microservico ace test functional`
