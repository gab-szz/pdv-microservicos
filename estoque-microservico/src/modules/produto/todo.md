# Guia de treino: Zod no modulo de produto

Este guia e um norte para evoluir o `produto.schema.ts` aos poucos. A ideia nao e copiar uma solucao pronta, mas treinar validacao de entrada, normalizacao e regras entre campos usando Zod.

## Objetivo

O schema HTTP deve responder a pergunta:

> Depois que esse dado passou pelo schema, o restante da aplicacao pode confiar minimamente nele?

Ele nao precisa substituir o dominio, mas deve proteger a borda da aplicacao contra entrada ruim: tipos errados, strings vazias, numeros invalidos, campos extras e formatos inesperados.

## Arquivos principais

- `produto.schema.ts`: validacao da entrada HTTP.
- `domain/produto.domain.ts`: regras do produto e construcao da entidade.

Repare no detalhe de contrato:

- No dominio existe `departamentoId`.
- No schema atual existe `departamento`.

Decida se o HTTP tambem vai receber `departamentoId` ou se voce quer aceitar `departamento` e transformar para `departamentoId` antes de chamar o dominio.

## Etapa 1: tipos basicos melhores

Comece endurecendo o schema atual.

Treine:

- `z.string()`
- `z.number()`
- `.min()`
- `.max()`
- `.positive()`
- `.int()`
- `.optional()`
- `.strict()`

Ideias para produto:

- `nome` deve ser obrigatorio.
- `nome` deve ter tamanho minimo.
- `nome` deve ter tamanho maximo.
- `precoCusto` deve ser positivo.
- `precoVenda` deve ser positivo.
- `departamentoId` deve ser inteiro positivo.
- campos desconhecidos devem ser rejeitados.

Checklist:

- [ ] Validar `nome`.
- [ ] Validar `precoCusto`.
- [ ] Validar `precoVenda`.
- [ ] Validar `departamentoId`.
- [ ] Decidir se o schema usa `.strict()`.

## Etapa 2: strings opcionais sem string vazia

Campo opcional nao e a mesma coisa que string vazia.

Exemplo de problema:

- `sku` ausente: pode ser valido.
- `sku: ""`: provavelmente nao deveria ser valido.
- `sku: "   "`: provavelmente tambem nao.

Treine:

- `.trim()`
- `.min(1)`
- `.optional()`
- transformacao de string vazia para `undefined`, se fizer sentido.

Ideias para produto:

- `codigoBarras` pode ser opcional.
- `sku` pode ser opcional.
- se vierem, nao devem estar vazios.

Checklist:

- [ ] Impedir `sku` vazio.
- [ ] Impedir `codigoBarras` vazio.
- [ ] Testar espacos em branco.
- [ ] Decidir se quer normalizar `""` para `undefined` ou rejeitar.

## Etapa 3: formatos com regex

Depois dos tipos, pratique formato.

Treine:

- `.regex()`
- mensagens customizadas de erro.

Ideias para produto:

- `codigoBarras` deve conter apenas numeros.
- `codigoBarras` pode ter tamanho 8, 12, 13 ou 14.
- `sku` pode aceitar letras, numeros, hifen e underline.
- `sku` pode ser convertido para caixa alta.

Checklist:

- [ ] Validar que `codigoBarras` so tem digitos.
- [ ] Validar tamanho permitido de `codigoBarras`.
- [ ] Criar um padrao para `sku`.
- [ ] Testar entradas invalidas como `"abc"`, `"123abc"` e `"   "`.

## Etapa 4: normalizacao de entrada

Validar e bom. Normalizar tambem.

Treine:

- `.transform()`
- `.pipe()`
- `z.preprocess()`

Ideias para produto:

- `nome` deve ser salvo sem espacos nas pontas.
- `sku` pode ser salvo em uppercase.
- `codigoBarras` pode remover espacos, se voce quiser aceitar entrada mais flexivel.
- `departamento` pode virar `departamentoId`, se o contrato HTTP usar outro nome.

Checklist:

- [ ] Aplicar `trim` em `nome`.
- [ ] Aplicar `trim` em `sku`.
- [ ] Transformar `sku` para uppercase.
- [ ] Decidir se normalizacao deve ficar no schema ou no service.

## Etapa 5: coercao para HTTP

Em HTTP, principalmente em `params` e `query`, muitos valores chegam como string.

Treine:

- `z.coerce.number()`
- `z.coerce.boolean()`
- `z.preprocess()`

Cuidado:

- `z.coerce.boolean()` usa a conversao nativa do JavaScript.
- No JavaScript, `Boolean("false")` e `true`.
- Para query params booleanos, talvez seja melhor tratar manualmente `"true"` e `"false"`.

Ideias para produto:

- `params.id` pode chegar como `"10"` e virar `10`.
- `query.page` pode chegar como `"1"` e virar `1`.
- `query.limit` pode chegar como `"20"` e virar `20`.
- `query.ativo` pode chegar como `"true"` ou `"false"`.

Checklist:

- [ ] Criar schema para params com `id`.
- [ ] Criar schema para query de listagem.
- [ ] Testar numeros invalidos como `"abc"`.
- [ ] Testar booleano `"false"` com cuidado.

## Etapa 6: validacao entre campos

Aqui comeca a parte mais interessante.

Treine:

- `.refine()`
- `.superRefine()` ou `.check()`, dependendo da versao do Zod instalada.
- erro apontando para um campo especifico.

Ideias para produto:

- `precoVenda` nao deve ser menor que `precoCusto`.
- talvez pelo menos um entre `sku` e `codigoBarras` deva existir.
- talvez `sku` e `codigoBarras` nao possam ser iguais.

Checklist:

- [ ] Validar `precoVenda >= precoCusto`.
- [ ] Criar uma regra envolvendo `sku` e `codigoBarras`.
- [ ] Fazer o erro aparecer no campo mais util para quem consumiu a API.

## Etapa 7: schemas por caso de uso

Evite um unico schema gigante para tudo.

Crie schemas separados conforme a entrada:

- `criarProdutoHttpSchema`
- `atualizarProdutoHttpSchema`
- `produtoParamsSchema`
- `listarProdutosQuerySchema`

Treine:

- `.partial()`
- `.pick()`
- `.omit()`
- `.extend()`
- `.merge()`

Ideias:

- Criacao exige `nome`, `precoCusto`, `precoVenda` e `departamentoId`.
- Atualizacao permite campos parciais.
- Atualizacao nao deve aceitar body vazio.
- Params validam `id`.
- Query valida filtros e paginacao.

Checklist:

- [ ] Separar schema de criacao.
- [ ] Separar schema de atualizacao.
- [ ] Impedir update com objeto vazio.
- [ ] Separar schema de params.
- [ ] Separar schema de query.

## Etapa 8: parse, safeParse e erros

Na borda HTTP, normalmente `safeParse` e mais confortavel que `parse`.

Treine:

- `schema.parse(input)`
- `schema.safeParse(input)`
- leitura de `result.success`
- formatacao dos erros.

Objetivo:

- Se validou, seguir com `result.data`.
- Se falhou, responder erro 400 com detalhes uteis.

Checklist:

- [ ] Criar um helper para validar schemas.
- [ ] Retornar erro 400 quando falhar.
- [ ] Mostrar campo e mensagem.
- [ ] Evitar expor stack trace ou erro cru demais.

## Etapa 9: relacao com o dominio

O schema HTTP protege a entrada externa.

O dominio protege as regras internas.

Uma divisao possivel:

- Zod valida tipos, formatos e entrada ruim.
- `Produto.criar` valida invariantes do produto.

Exemplos:

- Zod: `precoVenda` precisa ser numero positivo.
- Dominio: produto nao pode ser criado se violar uma regra central da entidade.
- Zod: `sku` precisa ter formato valido.
- Dominio: produto criado sempre com `ativo = true`.

Checklist:

- [ ] Decidir quais regras ficam no schema.
- [ ] Decidir quais regras ficam no dominio.
- [ ] Evitar duplicacao desnecessaria.
- [ ] Garantir que `Produto.criar` recebe dados ja normalizados.

## Desafios praticos

Tente implementar nesta ordem:

1. Endurecer `criarProdutoHttpSchema` com tipos, limites e `.strict()`.
2. Resolver o nome `departamento` versus `departamentoId`.
3. Rejeitar `nome`, `sku` e `codigoBarras` vazios.
4. Validar formato de `codigoBarras`.
5. Validar formato de `sku`.
6. Normalizar `nome` e `sku`.
7. Validar `precoVenda >= precoCusto`.
8. Criar `atualizarProdutoHttpSchema`.
9. Impedir update com body vazio.
10. Criar `produtoParamsSchema`.
11. Criar `listarProdutosQuerySchema`.
12. Criar helper de validacao usando `safeParse`.

## Casos de teste manuais

Use objetos pequenos para testar o schema enquanto treina.

Entradas que deveriam falhar:

- `{}`.
- `{ nome: "" }`.
- `{ nome: "   " }`.
- preco negativo.
- preco como string, se voce nao estiver usando coercao.
- `precoVenda` menor que `precoCusto`.
- `departamentoId` decimal.
- `codigoBarras` com letras.
- `sku` com simbolos fora do padrao.
- campo extra inesperado.

Entradas que deveriam passar:

- produto completo valido.
- produto sem `sku`.
- produto sem `codigoBarras`.
- produto com `sku` em lowercase, se voce decidir normalizar.
- params com `id` numerico.
- query params validos com strings convertidas.

## Referencias uteis

- Documentacao principal do Zod: https://zod.dev/
- API de schemas: https://zod.dev/api
- Transforms: https://zod.dev/api?id=transforms
- Preprocess: https://zod.dev/api?id=preprocess
- Refinements: https://zod.dev/api?id=refinements
- Packages e versoes: https://zod.dev/packages/zod
