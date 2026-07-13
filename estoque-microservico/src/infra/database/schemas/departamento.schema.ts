import { integer, snakeCase, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-orm/zod';
import type z from 'zod';

export const departamentoTable = snakeCase.table('departamento', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar({ length: 100 }).unique().notNull(),
  descricao: text(),
  criadoEm: timestamp().defaultNow().notNull(),
  alteradoEm: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  excluidoEm: timestamp({ withTimezone: true }),
});

export const departamentoInsertSchema = createInsertSchema(departamentoTable);
export const departamentoUpdateSchema = createUpdateSchema(departamentoTable);
export const departamentoSelectSchema = createSelectSchema(departamentoTable);

export type DepartamentoDTO = z.infer<typeof departamentoSelectSchema>;
export type InsertDepartamentoDTO = z.infer<typeof departamentoInsertSchema>;
export type UpdateDepartamentoDTO = z.infer<typeof departamentoUpdateSchema>;
