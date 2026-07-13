import app from './app.js';
import { env } from './config/env.js';

app
  .listen({ host: '0.0.0.0', port: env.PORTA })
  .then(() => {
    console.log(`Servidor ativo na porta ${env.PORTA}`);
  })
  .catch(() => {
    console.log('Não foi possível iniciar o servidor');
    process.exit(1);
  });
