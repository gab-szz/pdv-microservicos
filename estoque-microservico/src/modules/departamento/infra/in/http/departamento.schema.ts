import z from 'zod';

export const criarDepartamentoHttpSchema = z
  .object({
    nome: z.string().min(4),
    descricao: z.string().optional(),
  })
  .strict();
export type CriarDepartamentoHttpDTO = z.infer<typeof criarDepartamentoHttpSchema>;

export const departamentoHttpSchema = z.object({
  id: z.number(),
  nome: z.string(),
  descricao: z.string().nullish(),
  criadoEm: z.date(),
  atualizadoEm: z.date().nullish(),
  excluidoEm: z.date().nullish(),
});
