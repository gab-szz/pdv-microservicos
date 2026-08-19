import z from 'zod';
import validator from 'validator';

/**
 * TIPOS AUXILIARES
 */

const codigoBarrasSchema = z
  .string()
  .trim()
  .refine((value) => validator.isNumeric(value), {
    error: 'Código de barras deve conter apenas numeros',
  })
  .refine((value) => validator.isEAN(value), {
    error: 'EAN inválido',
  });

const skuSchema = z
  .string()
  .trim()
  .transform((value) => value.toUpperCase())
  .refine(
    (value) =>
      validator.isLength(value, { min: 1, max: 50 }) &&
      validator.isWhitelisted(value, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'),
    { error: 'SKU deve conter apenas letras, numeros, hifen ou underline' },
  );

/**
 * REQUEST
 */

export const criarProdutoHttpSchema = z
  .object({
    nome: z.string().trim().min(4).max(150),
    codigoBarras: codigoBarrasSchema.optional(),
    sku: skuSchema.optional(),
    precoCusto: z.number().positive(),
    precoVenda: z.number().positive(),
    departamentoId: z.number().int().positive(),
  })
  .strict();
export type CriarProdutoHttpDTO = z.infer<typeof criarProdutoHttpSchema>;

export const atualizarProdutoHttpSchema = criarProdutoHttpSchema;
export type AtualizarProdutoHttpDTO = z.infer<typeof atualizarProdutoHttpSchema>;

/**
 * REPLY
 */

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
