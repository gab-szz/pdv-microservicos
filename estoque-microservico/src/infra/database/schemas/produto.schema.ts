import { integer, pgTable } from 'drizzle-orm/pg-core';
import { baseSoftDeleteSchema } from './shared/schema.js';

export const produtoTable = pgTable('produto', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ...baseSoftDeleteSchema,
});
