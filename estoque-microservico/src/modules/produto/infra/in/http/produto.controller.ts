import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { criarProdutoHttpSchema } from './produto.schema.js';
import produtoModule from '../../../produto.module.js';

function produtoRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  const service = produtoModule.service();

  /**
   * Cria um novo Produto
   */
  app.post(
    '/',
    {
      schema: {
        body: criarProdutoHttpSchema,
        response: {},
      },
    },
    async (request, reply) => {
      const produtoInput = request.body;

      const output = service.cadastrar(produtoInput);

      return reply.code(200).send(output);
    },
  );

  app.get('/', {}, () => {});
}

export default produtoRoutes;
