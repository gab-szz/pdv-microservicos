import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';

async function instanciarModuloParaTestes(app: any, moduloRoutes: Function) {
  // 1. Instancia o Fastify isolado para o contexto de testes
  app = fastify().withTypeProvider<ZodTypeProvider>();
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // 2. Registra a rota que vamos testar
  await app.register(moduloRoutes);

  // 3. Aguarda os plugins estarem prontos
  await app.ready();

  return app;
}

export { instanciarModuloParaTestes };
