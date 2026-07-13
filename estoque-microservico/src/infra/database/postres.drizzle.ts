// src/infra/postgres.drizzle.ts

import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '@/config/env.js';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle({ client: pool, jit: true });
export type DB = typeof db;
