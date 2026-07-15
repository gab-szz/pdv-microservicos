import app from './app.js';
import { env } from './config/env.js';
import { testarConexaoRedis } from './infra/redis/redis.js';

app
  .listen({ host: '0.0.0.0', port: env.PORTA })
  .then(() => {
    testarConexaoRedis();
    console.log(`Servidor ativo na porta ${env.PORTA}`);
  })
  .catch(() => {
    console.log('Não foi possível iniciar o servidor');
    process.exit(1);
  });
