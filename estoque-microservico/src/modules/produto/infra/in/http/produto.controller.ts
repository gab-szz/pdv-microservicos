import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  atualizarProdutoHttpSchema,
  criarProdutoHttpSchema,
  produtoHttpSchema,
} from './produto.schema.js';
import produtoModule from '../../../produto.module.js';
import { idSchema } from '@gab-szz/pdv-schemas';
import { ProdutoHttpMapper } from './produto.mapper.js';
import { z } from 'zod';

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

  /**
   * Consulta todos os produtos
   */

  app.get(
    '/:id',
    {
      schema: {
        response: { 200: z.array(produtoHttpSchema) },
      },
    },
    async (_request, reply) => {
      const produtos = await service.consultarTodos();
      const produtosJson = produtos.map((produto) => ProdutoHttpMapper.paraResposta(produto));

      return reply.code(200).send(produtosJson);
    },
  );

  /**
   * Atualiza um produto
   */
  app.put(
    '/:id',
    {
      schema: {
        params: idSchema,
        body: atualizarProdutoHttpSchema,
        response: { 200: produtoHttpSchema },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { ...input } = request.body;

      const prodAtualizado = await service.atualizar({ id, ...input });

      return reply.code(200).send(ProdutoHttpMapper.paraResposta(prodAtualizado));
    },
  );

  /**
   * Exclui um produto
   */
  app.delete(
    '/:id',
    {
      schema: {
        params: idSchema,
        response: { 200: produtoHttpSchema },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const prodExcluido = await service.excluir(id);

      return reply.code(200).send(ProdutoHttpMapper.paraResposta(prodExcluido));
    },
  );
}

export default produtoRoutes;
