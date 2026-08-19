// src/infra/postgres.drizzle.ts

import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '@/config/env.js';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export async function testarConexaoPostgres() {
  await db.execute('SELECT 1');
  console.log('Conexão com postgres estabelecida com sucesso');
}

export const db = drizzle({ client: pool, jit: true });
export type DB = typeof db;
