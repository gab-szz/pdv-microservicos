import { env } from '@/config/env.js';
import { Redis } from 'ioredis';

export const redisClient = new Redis(env.REDIS_URL);

export async function testarConexaoRedis() {
  const msg = await redisClient.ping();
  if (msg === 'PONG') {
    console.log('Conexão com Redis estabelecida com sucesso.');
  } else {
    console.error('Falha ao conectar com Redis.');
  }
}
