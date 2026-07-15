// src/infra/database/schemas/shared/schema.ts

import { timestamp } from 'drizzle-orm/pg-core';

export const baseSoftDeleteSchema = {
  criadoEm: timestamp().defaultNow().notNull(),
  alteradoEm: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  excluidoEm: timestamp({ withTimezone: true }),
};
