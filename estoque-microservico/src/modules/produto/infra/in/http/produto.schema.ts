import z from 'zod';

export const criarProdutoHttpSchema = z
  .object({
    nome: z.string().trim().min(4).max(150),
    codigoBarras: z.string().trim().min(1).optional(),
    sku: z.string().trim().min(1).optional(),
    precoCusto: z.number().positive(),
    precoVenda: z.number().positive(),
    departamentoId: z.number().int().positive(),
  })
  .strict();
export type CriarProdutoHttpDTO = z.infer<typeof criarProdutoHttpSchema>;

export const produtoHttpSchema = z.object({
  id: z.number(),
  nome: z.string(),
  codigoBarras: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
  precoCusto: z.number(),
  precoVenda: z.number(),
  ativo: z.boolean(),
  departamentoId: z.number().int(),
  criadoEm: z.coerce.date(),
});
export type ProdutoHttpDTO = z.infer<typeof produtoHttpSchema>;
