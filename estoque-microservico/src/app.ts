import Fastify from 'fastify';
import { DrizzleQueryError } from 'drizzle-orm';
import { fastifyAwilixPlugin } from '@fastify/awilix';
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import produtoRoutes from './modules/produto/infra/in/http/produto.controller.js';
import departamentoRoutes from './modules/departamento/infra/in/http/departamento.controller.js';

import { drizzleErrorHandler } from './error/drizzle.error-handler.js';
import { ErroRegraNegocio } from './error/custom/regra-negocio.error.js';
import { testarConexaoPostgres } from './infra/database/postres.drizzle.js';
import { container } from './container/index.js';

const app = Fastify({ logger: false });

// ZOD PARSER
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// AWILIX PLUGIN
app.register(fastifyAwilixPlugin, { container });

// ERROR HANDLER
app.setErrorHandler((error, request, reply) => {
  if (error instanceof DrizzleQueryError) {
    return drizzleErrorHandler(error, request, reply);
  } else if (error instanceof ErroRegraNegocio) {
    console.log(error);
    return reply
      .status(400)
      .send({ error: error.name, message: error.message });
  } else if (hasZodFastifySchemaValidationErrors(error)) {
    return reply
      .status(400)
      .send({ error: error.name, message: error.message });
  } else {
    console.log(error);
  }
  return reply.status(500).send({
    error: 'Internal Server Error',
    message: 'Ocorreu um erro inesperado na aplicação',
  });
});

// ROTAS
app.get('/health', async (_request, reply) => {
  try {
    await testarConexaoPostgres();

    return reply.status(200).send({
      status: 'ativo',
      database: 'ativo',
      uptime: process.uptime(),
    });
  } catch {
    return reply.status(503).send({
      status: 'erro',
      database: 'indisponivel',
      uptime: process.uptime(),
    });
  }
});
app.register(produtoRoutes, { prefix: '/produtos' });
app.register(departamentoRoutes, { prefix: '/departamento' });

export default app;
