import { integer, snakeCase, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import type z from 'zod';
import { baseSoftDeleteSchema } from './shared/schema.js';

export const departamentoTable = snakeCase.table('departamento', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar({ length: 100 }).unique().notNull(),
  descricao: text(),
  ...baseSoftDeleteSchema,
});

export const departamentoInsertSchema = createInsertSchema(departamentoTable);
export const departamentoUpdateSchema = createUpdateSchema(departamentoTable);
export const departamentoSelectSchema = createSelectSchema(departamentoTable);

export type InsertDepartamentoDTO = z.infer<typeof departamentoInsertSchema>;
export type UpdateDepartamentoDTO = z.infer<typeof departamentoUpdateSchema>;
