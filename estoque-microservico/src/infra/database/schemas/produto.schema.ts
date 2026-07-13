import { integer, pgTable } from 'drizzle-orm/pg-core';

export const produtoTable = pgTable('produto', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
});
