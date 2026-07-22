# Guia de treino Zod — módulo Produto

Trilha prática para validar **entrada bruta HTTP** antes de chegar no domínio e no banco.

> **Pergunta-guia:** depois que passou pelo schema, o resto da aplicação pode confiar nesse objeto?

---

## 1. Camadas de validação

| Camada  | Arquivo                                        | Responsabilidade                                     |
| ------- | ---------------------------------------------- | ---------------------------------------------------- |
| HTTP    | `produto.schema.ts`                            | body, params, query — normalizar e rejeitar lixo     |
| Domínio | `produto.domain.ts`                            | regras de negócio (`precoVenda >= precoCusto`, etc.) |
| Banco   | `src/infra/database/schemas/produto.schema.ts` | contrato Drizzle (já existe)                         |

Treine nos dois primeiros para sentir a diferença.

---

## 2. Schemas por caso de uso

Crie separadamente em `produto.schema.ts`:

- [ ] `criarProdutoHttpSchema` — POST body
- [ ] `atualizarProdutoHttpSchema` — PATCH/PUT body (tudo opcional, body não pode ser vazio)
- [ ] `produtoParamsSchema` — `:id` na rota
- [ ] `listarProdutosQuerySchema` — `?page=&limit=&ativo=&busca=`

### Referência mínima (ponto de partida)

```ts
import z from 'zod';

export const criarProdutoHttpSchema = z.object({
  nome: z.string(),
  codigoBarras: z.string().optional(),
  sku: z.string().optional(),
  precoCusto: z.number(),
  precoVenda: z.number(),
  ativo: z.boolean().default(true),
  departamentoId: z.number(),
});
```

Use `.strict()` em todos para rejeitar campos extras.

---

## 3. Validações básicas

Treine em cada campo do `criarProdutoHttpSchema`:

| Campo            | Validações sugeridas                                |
| ---------------- | --------------------------------------------------- |
| `nome`           | `.min(1)`, `.max(150)`, `.trim()`                   |
| `codigoBarras`   | opcional, mas se vier: `.min(1)` (não aceitar `""`) |
| `sku`            | opcional, `.min(1)`, regex alfanumérico             |
| `precoCusto`     | `.positive()`                                       |
| `precoVenda`     | `.positive()`                                       |
| `departamentoId` | `.int().positive()`                                 |
| `ativo`          | `.boolean()` com default                            |

Docs: https://zod.dev/api#strings

---

## 4. Opcionais sem string vazia

HTTP costuma mandar `""` em vez de omitir o campo. Treine transformar:

```ts
const stringOpcional = z
  .string()
  .trim()
  .transform((v) => (v === '' ? undefined : v))
  .optional();
```

Ou com `.pipe()` / preprocess conforme preferir.

---

## 5. Regex e refinamentos simples

Use `.refine()` ou `.regex()` quando a regra depende de uma função sua:

- [ ] `codigoBarras` — só dígitos
- [ ] `sku` — padrão tipo `^[A-Z0-9-]{3,50}$`
- [ ] `nome` — sem caracteres inválidos (defina o que é inválido)
- [ ] preços — no máximo duas casas decimais

```ts
z.string().regex(/^\d+$/, 'Código de barras deve conter apenas dígitos');

z.number().refine((n) => Number.isInteger(n * 100), 'Preço deve ter no máximo 2 casas decimais');
```

Docs: https://zod.dev/api#refinements

---

## 6. Transformações

Normalize o input bruto antes do domínio:

- [ ] `nome.trim()`
- [ ] `sku.trim().toUpperCase()`
- [ ] string vazia → `undefined`
- [ ] (opcional) renomear `departamento` → `departamentoId` se o contrato HTTP for diferente

```ts
z.string()
  .trim()
  .transform((s) => s.toUpperCase());
```

Docs: https://zod.dev/api#transforms

---

## 7. Coerção (params e query)

Params e query chegam como **string**. Treine:

```ts
z.coerce.number().int().positive(); // :id, departamentoId na query

z.coerce.boolean(); // cuidado: "false" vira true no boolean nativo!
// prefira preprocess explícito para boolean em query strings
```

```ts
const ativoQuery = z.preprocess((val) => {
  if (val === 'true') return true;
  if (val === 'false') return false;
  return val;
}, z.boolean().optional());
```

Docs: https://zod.dev/api#coercion

---

## 8. Validação entre campos (o treino mais valioso)

Regras que dependem de mais de um campo:

- [ ] `precoVenda >= precoCusto`
- [ ] pelo menos um entre `sku` e `codigoBarras`
- [ ] `codigoBarras !== sku` (quando ambos existirem)
- [ ] `codigoBarras` com 8, 12, 13 ou 14 dígitos (EAN)

### Zod 4 — `.check()` no objeto

```ts
z.object({ precoCusto: z.number(), precoVenda: z.number() }).check((ctx) => {
  if (ctx.value.precoVenda < ctx.value.precoCusto) {
    ctx.issues.push({
      code: 'custom',
      message: 'Preço de venda não pode ser menor que o custo',
      path: ['precoVenda'],
      input: ctx.value,
    });
  }
});
```

### Alternativa — `.superRefine()` (comum em projetos)

```ts
.superRefine((data, ctx) => {
  if (data.precoVenda < data.precoCusto) {
    ctx.addIssue({
      code: 'custom',
      message: 'Preço de venda não pode ser menor que o custo',
      path: ['precoVenda'],
    });
  }
});
```

Confira sua versão: este projeto usa **Zod 4** (`package.json`).

---

## 9. Schema de update

```ts
export const atualizarProdutoHttpSchema = criarProdutoHttpSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Envie ao menos um campo para atualizar',
  });
```

Treine também: `.pick()`, `.omit()`, `.extend()`, `.merge()`.

---

## 10. Schema de listagem (query)

```ts
export const listarProdutosQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  ativo: /* seu preprocess de boolean */,
  busca: z.string().trim().optional(),
});
```

---

## 11. Params de rota

```ts
export const produtoParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
```

---

## 12. `safeParse` na camada HTTP

**Nunca** use `.parse()` direto no controller — ele lança exceção.

```ts
function validarSchema<T extends z.ZodType>(schema: T, input: unknown) {
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      ok: false as const,
      errors: result.error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensagem: issue.message,
        codigo: issue.code,
      })),
    };
  }

  return { ok: true as const, data: result.data };
}
```

Treine extrair: campo, mensagem, código e array formatado de erros.

Docs: https://zod.dev/api#safeparse

---

## 13. HTTP vs domínio — onde colocar cada regra?

| Regra                          | HTTP        | Domínio                     |
| ------------------------------ | ----------- | --------------------------- |
| `nome` obrigatório, max 150    | ✅          | —                           |
| `precoVenda` é número positivo | ✅          | ✅ (defesa em profundidade) |
| `precoVenda >= precoCusto`     | ✅ (refine) | ✅ (`Produto.criar`)        |
| SKU único no banco             | —           | ❌ (repositório)            |
| Departamento existe            | —           | ❌ (service/repositório)    |

Implemente `precoVenda >= precoCusto` **nos dois** como exercício e compare a sensação.

---

## 14. Integração com Fastify

Este projeto usa `fastify-type-provider-zod`. Depois de dominar `safeParse` na unha, conecte no controller:

```ts
app.post(
  '/',
  {
    schema: { body: criarProdutoHttpSchema },
  },
  handler,
);
```

O provider já valida automaticamente — mas entender `safeParse` antes ajuda a debugar.

---

## 15. Roteiro de implementação (ordem sugerida)

1. [ ] Corrigir/decidir `departamento` vs `departamentoId` no contrato HTTP
2. [ ] `.min`, `.max`, `.positive`, `.int` em todos os campos
3. [ ] `.trim()` e transforms simples
4. [ ] Regex para `sku` e `codigoBarras`
5. [ ] Validação cruzada `precoCusto` / `precoVenda`
6. [ ] `atualizarProdutoHttpSchema` com `.partial()` + body não vazio
7. [ ] `listarProdutosQuerySchema` com coerção
8. [ ] `produtoParamsSchema`
9. [ ] Helper `validarSchema()` com `safeParse`
10. [ ] Conectar no `produto.controller.ts`

---

## 16. Desafios extras

- [ ] Aceitar `precoCusto` como string `"19.90"` no body e converter com `z.coerce.number()`
- [ ] Normalizar `codigoBarras` removendo espaços e hífens antes de validar
- [ ] Criar `z.discriminatedUnion` se no futuro existir tipos de produto diferentes
- [ ] Exportar tipos inferidos: `type CriarProdutoHttp = z.infer<typeof criarProdutoHttpSchema>`
- [ ] Testar manualmente com `.http` ou Insomnia payloads inválidos

---

## 17. Links da documentação

- Schemas e tipos: https://zod.dev/api
- Refinements: https://zod.dev/api#refinements
- Transforms: https://zod.dev/api#transforms
- Coercion: https://zod.dev/api#coercion
- Preprocess: https://zod.dev/api#preprocess
- safeParse: https://zod.dev/api#safeparse
- Zod 4 changelog: https://zod.dev/v4

---

## 18. O que já existe no projeto (não confundir)

| Arquivo                                           | O que é                                                        |
| ------------------------------------------------- | -------------------------------------------------------------- |
| `src/infra/database/schemas/produto.schema.ts`    | Tabela Drizzle + `produtoInsertSchema` / `produtoUpdateSchema` |
| `src/modules/produto/produto.schema.ts`           | **Seu** schema HTTP — é aqui que você treina                   |
| `src/modules/departamento/departamento.schema.ts` | Exemplo mínimo já funcionando                                  |

O schema do banco valida o que vai pro Postgres. O schema HTTP valida o que veio do cliente. São contratos diferentes.
