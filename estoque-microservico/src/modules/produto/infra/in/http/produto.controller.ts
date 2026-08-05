import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { criarProdutoHttpSchema, produtoHttpSchema } from './produto.schema.js';
import produtoModule from '../../../produto.module.js';
import { idSchema } from '@gab-szz/pdv-schemas';
import { ProdutoHttpMapper } from './produto.mapper.js';

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
        response: { 200: produtoHttpSchema },
      },
    },
    async (request, reply) => {
      const produtoInput = request.body;

      const output = await service.cadastrar(produtoInput);

      return reply.code(200).send(ProdutoHttpMapper.paraResposta(output));
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
        response: { 200: produtoHttpSchema },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const produto = await service.consultarPeloId(id);

      return reply.code(200).send(ProdutoHttpMapper.paraResposta(produto));
    },
  );
}

export default produtoRoutes;
