import Fastify from 'fastify';
import produtoRoutes from './modules/produto/produto.controller.js';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import departamentoRoutes from './modules/departamento/departamento.controller.js';
import { DrizzleQueryError } from 'drizzle-orm';
import { drizzleErrorHandler } from './error/drizzle.error-handler.js';

const app = Fastify({ logger: false });

// ZOD PARSER
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// ERROR HANDLER
app.setErrorHandler((error, request, reply) => {
  if (error instanceof DrizzleQueryError) {
    return drizzleErrorHandler(error, request, reply);
  } else {
    console.log(error);
  }
  reply.status(500).send('Erro interno no servidor');
});

// ROTAS
app.register(produtoRoutes, { prefix: '/produtos' });
app.register(departamentoRoutes, { prefix: '/departamento' });

export default app;
