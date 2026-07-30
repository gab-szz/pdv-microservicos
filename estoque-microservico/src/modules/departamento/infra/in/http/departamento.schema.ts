import z from 'zod';

export const criarDepartamentoHttpSchema = z
  .object({
    nome: z.string().min(4),
    descricao: z.string().optional(),
  })
  .strict();
export type CriarDepartamentoHttpDTO = z.infer<typeof criarDepartamentoHttpSchema>;
