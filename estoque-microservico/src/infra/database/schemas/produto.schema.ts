import { boolean, check, integer, numeric, snakeCase, varchar } from 'drizzle-orm/pg-core';
import { baseSoftDeleteSchema } from './shared/schema.js';
import { sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type z from 'zod';

/**
 ** TABELA
 */
export const produtoTable = snakeCase.table(
  'produto',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    nome: varchar({ length: 150 }).notNull(),
    codigoBarras: varchar({ length: 50 }),
    sku: varchar({ length: 50 }),
    precoCusto: numeric({ precision: 10, scale: 2 }).notNull(),
    precoVenda: numeric({ precision: 10, scale: 2 }).notNull(),
    ativo: boolean().default(true).notNull(),
    departamentoId: integer().notNull(),
    ...baseSoftDeleteSchema,
  },
  (table) => [
    check('ck_produto_preco_custo_positivo', sql`${table.precoCusto} > 0`),
    check('ck_produto_preco_venda_positivo', sql`${table.precoVenda} > 0`),
    check('ck_preco', sql`${table.precoVenda} >= ${table.precoCusto}`),
  ],
);

/**
 ** SCHEMAS ZOD
 */
export const produtoInsertSchema = createInsertSchema(produtoTable);
export const produtoUpdateSchema = createUpdateSchema(produtoTable);
export const produtoSelectSchema = createSelectSchema(produtoTable);

/**
 ** TIPOS
 */
export type InsertProdutoDTO = z.infer<typeof produtoInsertSchema>;
export type UpdateProdutoDTO = z.infer<typeof produtoUpdateSchema>;
