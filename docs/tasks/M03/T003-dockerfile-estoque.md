# T003 — Imagem multi-stage do Estoque

> **Milestone:** M03 · **Status:** pendente · **Depende de:** M01

## Objetivo
Criar imagem de produção do Estoque com build separado e execução sem dependências de desenvolvimento.

## Arquivos
`estoque-microservico/Dockerfile`, `estoque-microservico/.dockerignore`

## Pronto quando
- A imagem compila TypeScript e inicia `dist/server.js`.
- Dependências de desenvolvimento não estão na imagem final.

## Verifica
`docker build -t projeto-pdv-estoque ./estoque-microservico`
