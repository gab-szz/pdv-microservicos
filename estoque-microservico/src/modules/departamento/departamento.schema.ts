import z from 'zod';

export const departamentoCreateSchema = z.object({
  nome: z.string().min(4),
  descricao: z.string().optional(),
});
