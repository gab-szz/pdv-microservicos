# T002 — Ambientes e bancos de teste

> **Milestone:** M03 · **Status:** pendente · **Depende de:** T001

## Objetivo
Separar configurações de desenvolvimento e teste para impedir que suites usem dados persistentes.

## Arquivos
`.env.example`, `estoque-microservico/.env.example`, `pdv-microservico/.env.example`

## Pronto quando
- URLs de desenvolvimento e teste usam bancos diferentes.
- Segredos não ficam versionados.

## Verifica
`docker compose config`
