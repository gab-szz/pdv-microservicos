import type { FastifyReply, FastifyRequest } from 'fastify';
import { DatabaseError } from 'pg';

export function drizzleErrorHandler(error: unknown, _request: FastifyRequest, reply: FastifyReply) {
  const cause = error instanceof Error ? error.cause : undefined;
  console.log(error);

  if (cause instanceof DatabaseError) {
    if (cause.code === '23505') {
      return reply.code(500).send({
        error: 'Conflict',
        message: 'Chave única duplicada, verifique os dados enviados e tente novamente',
      });
    }
  }

  return reply.status(500).send({
    error: 'Internal Server Error',
    message: 'Erro no Banco de Dados',
  });
}
