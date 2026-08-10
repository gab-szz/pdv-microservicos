import { env } from '@/config/env.js';
import { Redis } from 'ioredis';

export const redisClient = new Redis(env.REDIS_URL, { lazyConnect: true });

export async function testarConexaoRedis() {
  try {
    await redisClient.connect();
    const msg = await redisClient.ping();

    if (msg !== 'PONG') {
      throw new Error(`Ping Redis retornou valor inesperado: ${msg}`);
    }

    console.log('Conexão com Redis estabelecida com sucesso.');
  } catch (error) {
    throw error;
  }
}
