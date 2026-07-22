//import { departamentoSelectSchema } from '@/infra/schemas/departamento.schema.js';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { criarDepartamentoHttpSchema } from './departamento.schema.js';
import { db } from '@/infra/database/postres.drizzle.js';
import { departamentoSelectSchema } from '@/infra/database/schemas/departamento.schema.js';
import { departamentoContainer } from './departamento.container.js';
import z from 'zod';
import { idSchema } from '@/global/zod.schemas.js';

function departamentoRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  const service = departamentoContainer(db);

  // Cria um novo departamento
  app.post(
    '/',
    {
      schema: {
        body: criarDepartamentoHttpSchema,
        response: {
          200: departamentoSelectSchema.omit({ alteradoEm: true, excluidoEm: true }),
        },
      },
    },
    async (request, reply) => {
      const departamento = request.body;

      return reply.status(200).send((await service.criar(departamento)) as any);
    },
  );

  // Consulta departamentos
  app.get(
    '/',
    {
      schema: {
        response: { 200: z.array(departamentoSelectSchema) },
      },
    },
    async (_request, reply) => {
      const departamentos = await service.consultar();
      return reply.status(200).send(departamentos as any);
    },
  );

  // Consulta um departamento pelo ID
  app.get(
    '/:id',
    {
      schema: {
        params: idSchema,
        response: { 200: departamentoSelectSchema },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const depto = await service.consultarPeloId(id);
      return reply.status(200).send(depto as any);
    },
  );

  // Atualiza um departamento
  app.put(
    '/:id',
    {
      schema: {
        body: criarDepartamentoHttpSchema,
        params: idSchema,
        response: { 200: departamentoSelectSchema },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const depto = await service.atualizar(id, request.body);

      return reply.code(200).send(depto as any);
    },
  );

  // Exclui um departamento
  app.delete(
    '/:id',
    {
      schema: { params: idSchema },
    },
    async (request, reply) => {
      const { id } = request.params;
      const depto = await service.excluir(id);

      return reply.code(200).send(depto as any);
    },
  );

  // Gera um resumo dos departamentos cadastrados
  app.get('/resumo', async (_request, reply) => {
    const resumo = await service.resumoDepartamento();
    return reply.code(200).send(resumo as any);
  });
}

export default departamentoRoutes;
