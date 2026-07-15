import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
  AMBIENTE: z.enum(['producao', 'homologacao', 'desenvolvimento']).default('desenvolvimento'),
  PORTA: z.coerce.number(),

  DATABASE_URL: z.string(),
  OPENROUTER_API_KEY: z.string(),

  REDIS_URL: z.string(),
});

export const env = envSchema.parse(process.env);
