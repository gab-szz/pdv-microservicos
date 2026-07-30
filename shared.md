# Shared Kernel & Bibliotecas Internas

Guia de laboratório para aprender compartilhamento de código, SemVer e distribuição de libs internas, simulando um cenário de empresa.

**Objetivo final:** libs em `packages/` → publicar no GitHub Packages → microserviços consomem a versão publicada.

**Objetivo agora (fase A):** entender **pnpm workspaces** — microserviços consomem a lib via `workspace:*` (link local). Só depois apontamos para o registry.

Você implementa na mão. Este documento é o mapa; a IA entra para dúvidas pontuais.

---

## 0. Fases do laboratório

| Fase                       | O que praticar                         | Como o microserviço resolve a lib       |
| -------------------------- | -------------------------------------- | --------------------------------------- |
| **A — Workspaces (agora)** | monorepo, link local, rebuild, imports | `"@scope/domain-errors": "workspace:*"` |
| **B — Changesets**         | SemVer + changelog sem publicar        | ainda `workspace:*`                     |
| **C — GitHub Packages**    | auth, publish, install do registry     | `"@scope/domain-errors": "^1.0.0"`      |
| **D — CI**                 | Action de publish                      | idem C                                  |

Não pule a fase A. Workspaces ensinam _o que_ é um pacote no monorepo; Packages ensina _distribuir_ e _versionar de forma independente_ entre serviços.

---

## 1. Visão da estrutura

```text
Projeto-PDV/
├── estoque-microservico/     # fase A: workspace:*  |  fase C: ^x.y.z do GitHub Packages
├── pdv-microservico/         # idem
├── packages/                 # código-fonte das libs
│   ├── domain-errors/        # 1ª lib
│   └── ...
├── .changeset/               # fase B+
├── pnpm-workspace.yaml
├── package.json              # root do monorepo
└── shared.md
```

### Regra por fase

| Fase      | De onde o microserviço importa?             |
| --------- | ------------------------------------------- |
| **A / B** | pacote linkado do workspace (`workspace:*`) |
| **C / D** | versão no GitHub Packages (`^1.0.0`)        |
| Sempre    | código da lib vive em `packages/<lib>`      |

---

## 1.1 Como o workspace funciona (ler antes de montar)

### Ideia

O root declara quais pastas são pacotes do monorepo. O pnpm trata `packages/domain-errors` como um pacote npm de verdade (pelo `name` do `package.json`). Quando o microserviço declara `workspace:*`, o pnpm **não baixa do registry**: cria um **symlink** para a pasta local.

```text
estoque-microservico/node_modules/@scope/domain-errors
        │
        └── symlink ──►  ../../packages/domain-errors
```

Alteração na lib reflete nos serviços sem `npm publish` (se a entrada for `dist/`, rode o build da lib de novo).

### Peças mínimas da fase A

1. Root com `package.json` + `pnpm-workspace.yaml`:

```yaml
packages:
  - "packages/*"
  - "estoque-microservico"
  - "pdv-microservico"
```

2. Lib `packages/domain-errors/package.json` com `"name": "@scope/domain-errors"` e `exports` / `main`.

3. No consumidor (`estoque-microservico/package.json`):

```json
"dependencies": {
  "@scope/domain-errors": "workspace:*"
}
```

4. Na raiz: `pnpm install` — instala deps e cria os links.

### O que observar na fase A (checklist mental)

- `ls -l estoque-microservico/node_modules/@seu-scope/` → deve apontar para `packages/...`
- Import: `from '@seu-scope/domain-errors'` — **nunca** path relativo `../../packages/...`
- Mudou a lib e ela só exporta `dist/` → `pnpm --filter @seu-scope/domain-errors build`
- Os dois serviços veem a **mesma** revisão da lib (ainda sem versões independentes)

### Limitação didática (por isso existe a fase C)

Com `workspace:*`, estoque e PDV sempre compartilham o mesmo código linkado. Você ainda **não** pratica “estoque em `1.2.0` e PDV em `1.0.0`”. Primeiro entenda o pacote; depois o registry.

### Roteiro concreto — só fase A

- [ ] Instalar pnpm (se ainda não tiver)
- [ ] Criar `package.json` na raiz + `pnpm-workspace.yaml`
- [ ] Criar `packages/domain-errors` (código mínimo: `ErroRegraNegocio` + build + test)
- [ ] Migrar o estoque para pnpm no monorepo (`pnpm install` na raiz)
- [ ] Adicionar `"@scope/domain-errors": "workspace:*"` no estoque e no pdv
- [ ] Trocar o import local do estoque pelo pacote
- [ ] Confirmar o symlink em `node_modules`
- [ ] Mudar uma mensagem de erro na lib, rebuild se preciso, ver o efeito no estoque

**Ainda não:** `.npmrc` do GitHub Packages, publish, Changesets (pode deixar para a fase B).

---

## 2. Shared Kernel vs o que NÃO compartilhar

Em DDD, **Shared Kernel** é o mínimo de modelo/contrato que dois bounded contexts precisam alinhar de propósito. Tudo além disso vira acoplamento indesejado.

### Faz sentido compartilhar (kernel / contratos)

| Conceito                                                                                                   | Por quê é kernel                                           | Pacote sugerido                         |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------- |
| Hierarquia de erros de domínio (`ErroRegraNegocio`, depois subclasses genéricas)                           | Ambos validam regras e mapeiam erro → HTTP                 | `@scope/domain-errors`                  |
| Value objects **neutros** de dinheiro (`Preco` / `Money`)                                                  | Estoque e PDV calculam valores com as mesmas invariantes   | `@scope/money` (ou `pricing-vo`)        |
| Contratos de eventos (Zod + tipos + nomes dos tópicos)                                                     | Estoque publica, PDV consome — **fonte única do contrato** | `@scope/events-contracts`               |
| Primitivos Zod reutilizáveis (`id`, barcode genérico) — só se forem estáveis e sem regra de um só contexto | Evita drift na borda HTTP                                  | `@scope/validation-primitives` (depois) |

### NÃO compartilhar (pertence a um contexto)

- Domínio de **Produto**, **Departamento**, **Estoque**, **Movimentação** → só estoque
- Domínio de **Venda**, **Carrinho**, **Pagamento**, **Caixa** → só PDV
- Schemas Drizzle, migrations, adapters Redis/BullMQ específicos
- Controllers, services, containers de DI de cada API
- Soft-delete / colunas de auditoria do banco do estoque
- Regras do tipo “preço de venda ≥ custo” se forem exclusivas do cadastro de produto (podem usar `Money`/`Preco`, mas a regra fica no estoque)

**Preferência:** vários pacotes pequenos e coesos (`domain-errors`, `money`, `events-contracts`) em vez de um `@scope/shared` genérico.

---

## 3. Ordem incremental (um ciclo completo por vez)

Cada etapa = desenvolver → testar → versionar → publicar → instalar nos **dois** serviços → experimentar bump major/minor/patch.

### Ciclo 1 — `@scope/domain-errors` (começar aqui)

**Por quê primeiro**

- Já existe no estoque (`ErroRegraNegocio`)
- Zero dependência de Fastify/Drizzle
- O PDV ainda está vazio: dá para “consumir” cedo (mesmo que só num smoke test / handler)
- Ensina build + publish + install sem complexidade de domínio

**Escopo mínimo da lib**

- `ErroRegraNegocio` (classe base)
- (Opcional no mesmo pacote, ainda no ciclo 1) 1–2 subclasses estáveis: `ErroValidacao`, `ErroNaoEncontrado`
- Export público limpo (`package.json` → `exports`)
- Testes unitários da hierarquia (`instanceof`, `name`, mensagem)

**Depois de publicado:** estoque troca o import local pela versão do registry; PDV adiciona a dependência e usa no error handler (mesmo que o restante da API ainda não exista).

### Ciclo 2 — `@scope/money` (ou `preco`)

- Extrair `Preco` (hoje em `global/domain/value-objects/preco.vo.ts`)
- Depende de `@scope/domain-errors` **publicada** ( SemVer: range `^x.y.z` )
- Testes de invariantes (≤ 0, soma, comparação)
- Aprender impacto: mudança incompatível em `Preco` = **major**; método novo = **minor**; fix de bug = **patch**

### Ciclo 3 — `@scope/events-contracts`

- Só quando o roadmap de eventos Redis estiver em andamento
- Schemas Zod dos eventos (`ProdutoCriado`, `EstoqueAtualizado`, …) + tipos TypeScript
- Aqui o Shared Kernel fica “de verdade”: breaking change no payload quebra o consumidor — ótimo laboratório de SemVer

### Ciclos posteriores (se ainda fizer sentido)

- `@scope/validation-primitives` — Zod de `id`, etc.
- `@scope/http-errors` — mapeamento erro de domínio → status HTTP (cuidado: acopla a “HTTP”; pode ficar em cada API no começo)

Não extrair o próximo pacote até fechar o ciclo publish → consume → bump de versão do pacote atual.

---

## 4. Arquitetura dentro de cada pacote (DDD / Clean)

Libs de domínio **não** conhecem Fastify, Drizzle, Redis nem `process.env`.

Estrutura sugerida por pacote:

```text
packages/domain-errors/
├── src/
│   ├── index.ts              # API pública (barrel controlado)
│   └── erro-regra-negocio.ts
├── test/                     # ou src/**/*.test.ts
├── package.json
├── tsconfig.json
├── tsup.config.ts            # build
└── README.md                 # o que exporta, SemVer, exemplo de uso
```

Camadas (mesmo em lib pequena):

| Camada      | Na lib de erros / money     | O que fica fora             |
| ----------- | --------------------------- | --------------------------- |
| Domain      | classes, invariantes, tipos | —                           |
| Application | quase nada nestas libs      | use cases dos microserviços |
| Infra       | **não**                     | DB, HTTP, filas             |
| Interface   | só o `exports` do pacote    | controllers                 |

**API pública:** exportar só o necessário via `src/index.ts`. Mudança em arquivo interno sem alterar o export pode ser patch; remover/renomear export = major.

---

## 5. Ferramentas: o quê e por quê

### pnpm workspaces

- **O quê:** monorepo com `pnpm-workspace.yaml` listando `packages/*` e os microserviços.
- **Por quê em empresas:** hoisting previsível, link local durante o desenvolvimento da lib, um lockfile, scripts no root (`pnpm -r test`, `pnpm --filter @scope/domain-errors build`).
- **No seu laboratório:** workspaces = fábrica da lib. Os microserviços, no fluxo alvo, instalam do **GitHub Packages**, não de `workspace:*` (pode usar `workspace:*` só enquanto desenvolve a lib, depois troca pelo range publicado para praticar o fluxo real).

### tsup (ou unbuild / tsdown)

- **O quê:** bundler simples para libraries TypeScript (ESM/CJS + `.d.ts`).
- **Por quê:** tsc sozinho funciona, mas tsup é comum em libs internas por gerar artefato pronto (`dist/`), dual format se precisar, e DX rápida.
- **Alternativa válida:** `tsc` + `tsconfig` com `declaration: true` — mais “cru”, também didático.

### Vitest

- Já usado no estoque. Manter Vitest nas libs = mesma ferramenta, foco em testes de domínio puros (rápidos, sem DB).

### Changesets (`@changesets/cli`)

- **O quê:** cada PR/alteração em lib ganha um arquivo markdown em `.changeset/` descrevendo o bump (`patch` | `minor` | `major`) e a mensagem.
- **Por quê em empresas:** versionamento consciente + changelog automático + evita “subir versão no feeling”. Em monorepos com várias libs, resolve dependências entre pacotes (ex.: `money` depende de `domain-errors`).
- **Fluxo típico:**
  1. Altera código da lib
  2. `pnpm changeset` → escolhe pacote + tipo SemVer + resumo
  3. `pnpm changeset version` → bump em `package.json` + gera/atualiza `CHANGELOG.md`
  4. Commit + publish (manual ou CI)

### SemVer (lembrete rápido)

| Bump              | Quando                | Exemplo no laboratório                             |
| ----------------- | --------------------- | -------------------------------------------------- |
| **patch** `1.0.1` | bugfix, sem mudar API | corrigir mensagem de erro                          |
| **minor** `1.1.0` | API nova, compatível  | adicionar `ErroConflito`                           |
| **major** `2.0.0` | quebra consumidor     | renomear classe, mudar assinatura de `Preco.criar` |

Exercício obrigatório no ciclo 1 ou 2: publicar `1.0.0`, deixar um serviço em `^1.0.0`, outro pinado em `1.0.0`; depois publicar `2.0.0` e ver só um atualizar.

### GitHub Packages

- **O quê:** registry npm privado/org ligado ao GitHub (`https://npm.pkg.github.com`).
- **Por quê:** padrão de lib interna sem npm público; auth via `NODE_AUTH_TOKEN` / PAT com `read:packages` / `write:packages`.
- **Config típica:** `publishConfig.registry` no `package.json` da lib + `.npmrc` no root/consumidores:

```ini
@SEU_SCOPE:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

O `name` do pacote deve ser scoped: `@seu-user-ou-org/domain-errors`.

### GitHub Actions (quando o manual estiver confortável)

- **O quê:** no push de changeset na `main` (ou tag), CI roda test → `changeset version` (ou action oficial) → `pnpm publish`.
- **Por quê em empresas:** ninguém publica da máquina com token colado no histórico; repetível e auditável.
- **No laboratório:** primeiro publish **manual** (`pnpm publish` autenticado). Depois automatize — assim você entende o que a Action está encapsulando.

### Tríade que você quer aprender

```text
pnpm workspaces  →  desenvolver e linkar libs no monorepo
Changesets       →  SemVer + changelog ao longo do tempo
GitHub Actions   →  publicar no GitHub Packages sem fricção
```

Isso cobre escrever a lib **e** operá-la — o que costuma faltar em projetos só de estudo.

---

## 6. Fluxo alvo (checklist por fase)

### Fase A — Workspaces (faça isto agora)

- [ ] Root com `package.json` + `pnpm-workspace.yaml` (`packages/*`, microserviços)
- [ ] Migrar instalação para pnpm (`pnpm install` na raiz)
- [ ] `packages/domain-errors` com `src/`, testes, build (`tsup` ou `tsc`), `exports`
- [ ] `pnpm --filter @scope/domain-errors build` e `test` passando
- [ ] Nos dois microserviços: `"@scope/domain-errors": "workspace:*"`
- [ ] Estoque: remover arquivo local duplicado; importar do pacote
- [ ] PDV: dependência + uso mínimo (ex.: re-export ou throw de teste)
- [ ] Confirmar symlink em `node_modules/@scope/...`
- [ ] Alterar a lib e ver o efeito nos serviços (rebuild se usar `dist/`)

**Pare aqui** até workspace estar claro. Não configure registry ainda.

### Fase B — Changesets (ainda sem publish)

- [ ] `pnpm changeset init`
- [ ] Alterar a lib → `pnpm changeset` → `pnpm changeset version`
- [ ] Ler `CHANGELOG.md` e o bump no `package.json` da lib
- [ ] Serviços continuam em `workspace:*` (consomem o código local versionado)

### Fase C — GitHub Packages

- [ ] `.npmrc` com scope + token via env (**nunca** commitado)
- [ ] Trocar nos serviços: `"@scope/domain-errors": "^1.0.0"` (versão publicada)
- [ ] `pnpm publish` da lib
- [ ] `pnpm install` nos serviços autenticados no registry
- [ ] Confirmar que **não** há import `../../packages/...` nem dependência `workspace:*` (no fluxo “empresa”)

### Fase D — Laboratório SemVer no registry

- [ ] Minor → `1.1.0` → atualizar só um serviço
- [ ] Major → `2.0.0` → um serviço em v1, outro em v2
- [ ] Só então repetir o ciclo para `@scope/money`, depois `events-contracts`
- [ ] (Opcional) GitHub Action de publish

---

## 7. Decisões conscientes (anti-armadilhas)

1. **Fase A:** use `workspace:*`, nunca path relativo `../../packages/...`. **Fase C:** troque para versão do registry — senão você nunca pratica auth e ranges.
2. **Não criar `@scope/shared`.** Nome ruim = desculpa para jogar qualquer coisa dentro.
3. **Lib de domínio sem framework.** Se precisar de Fastify, a responsabilidade provavelmente é do microserviço (ou de um pacote `http-*` separado, mais tarde).
4. **Contratos de eventos > utilitários genéricos.** Quando chegar a hora, `events-contracts` ensina mais sobre microserviços do que mais um helper.
5. **Token só em env / GitHub Secrets.** `.npmrc` com token commitado é o erro clássico de portfólio.
6. **Primeira lib pequena.** `domain-errors` fecha o ciclo sem você se perder em money + Zod + build + CI ao mesmo tempo.

---

## 8. Mapa do código atual → futura lib

| Código hoje (estoque)                                 | Destino                                                     | Ciclo       |
| ----------------------------------------------------- | ----------------------------------------------------------- | ----------- |
| `src/error/custom/regra-negocio.error.ts`             | `@scope/domain-errors`                                      | 1           |
| `src/global/domain/value-objects/preco.vo.ts`         | `@scope/money`                                              | 2           |
| `src/global/domain/value-objects/codigo-barras.vo.ts` | avaliar: VO de produto (estoque) vs primitivo compartilhado | 2+ ou nunca |
| `src/global/zod.schemas.ts` (`idSchema`)              | `@scope/validation-primitives` ou ficar local               | 3+          |
| Eventos (ainda no roadmap)                            | `@scope/events-contracts`                                   | 3           |
| `app.ts` error handler HTTP                           | permanece em cada API (ou lib http depois)                  | —           |
| Drizzle / Redis / módulos                             | nunca no Shared Kernel                                      | —           |

---

## 9. Definition of Done

**Fase A (workspaces) — feito quando você explicar:**

1. O que `pnpm-workspace.yaml` lista e por quê
2. O que `workspace:*` faz (symlink, não download)
3. Por que o import é `@scope/...` e não path relativo
4. Por que estoque e PDV ainda não podem ficar em versões diferentes da lib

**Laboratório completo (fases A–D) — feito quando explicar também:**

5. Shared Kernel vs contexto isolado
6. Changesets → patch / minor / major
7. Resolução via GitHub Packages
8. Impacto de um serviço em major N e outro em N−1

---

## 10. Próximo passo concreto

**Agora (fase A):** root do monorepo + pnpm workspaces + só `packages/domain-errors` + consumo via `workspace:*` nos dois microserviços. Sem GitHub Packages, sem Changesets ainda.

**Depois:** fase B (Changesets) → fase C (publish + `^x.y.z`).

Quando travar (symlink, `exports`, filter do pnpm, build da lib), use a IA como consultoria pontual — não para montar o monorepo inteiro de uma vez.
