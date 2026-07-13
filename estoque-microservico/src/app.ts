import Fastify from 'fastify';
import produtoRoutes from './modules/produto/produto.controller.js';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import departamentoRoutes from './modules/departamento/departamento.controller.js';

const app = Fastify({ logger: true });

// ZOD PARSER
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// ROTAS
app.register(produtoRoutes, { prefix: '/produtos' });
app.register(departamentoRoutes, { prefix: '/departamento' });

export default app;
