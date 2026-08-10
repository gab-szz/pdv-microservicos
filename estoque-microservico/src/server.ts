import app from './app.js';
import { env } from './config/env.js';
import { testarConexaoPostgres } from './infra/database/postres.drizzle.js';
import { testarConexaoRedis } from './infra/redis/redis.js';

async function main() {
  try {
    await testarConexaoPostgres();
    await testarConexaoRedis();

    await app.listen({ host: '0.0.0.0', port: env.PORTA });
  } catch (error) {
    console.error('Falha ao inicializar a aplicação: ', error);
    process.exit(1);
  }
}

main();
