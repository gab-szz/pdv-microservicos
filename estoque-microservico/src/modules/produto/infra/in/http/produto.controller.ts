import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { criarProdutoHttpSchema, produtoHttpSchema } from './produto.schema.js';
import produtoModule from '../../../produto.module.js';
import { idSchema } from '@gab-szz/pdv-schemas';

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

  /**
   * Consulta um produto pelo ID
   */
  app.get(
    '/:id',
    {
      schema: {
        params: idSchema,
        response: produtoHttpSchema,
      },
    },
    async (request, reply) => {
      const id = request.id;

      const produto = service.consultarPeloId(Number(id));

      return reply.code(200).send(produto);
    },
  );
}

export default produtoRoutes;
