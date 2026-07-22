import Fastify from 'fastify';
import produtoRoutes from './modules/produto/produto.controller.js';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import departamentoRoutes from './modules/departamento/departamento.controller.js';
import { DrizzleQueryError } from 'drizzle-orm';
import { drizzleErrorHandler } from './error/drizzle.error-handler.js';
import { ErroRegraNegocio } from './error/custom/regra-negocio.error.js';

const app = Fastify({ logger: false });

// ZOD PARSER
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// ERROR HANDLER
app.setErrorHandler((error, request, reply) => {
  if (error instanceof DrizzleQueryError) {
    return drizzleErrorHandler(error, request, reply);
  } else if (error instanceof ErroRegraNegocio) {
    console.log(error);
    return reply.status(400).send({ error: error.name, message: error.message });
  } else {
    console.log(error);
  }
  return reply
    .status(500)
    .send({ error: 'Internal Server Error', message: 'Ocorreu um erro inesperado na aplicação' });
});

// ROTAS
app.register(produtoRoutes, { prefix: '/produtos' });
app.register(departamentoRoutes, { prefix: '/departamento' });

export default app;
