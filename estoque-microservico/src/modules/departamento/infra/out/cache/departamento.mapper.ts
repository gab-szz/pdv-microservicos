import { Departamento } from '@/modules/departamento/domain/departamento.domain.js';
import { z } from 'zod';

// representação do Redis
export const DepartamentoCacheSchema = z.object({
  id: z.number(),
  nome: z.string(),
  descricao: z.string().optional(),
  criadoEm: z.string(),
  alteradoEm: z.string().optional(),
  excluidoEm: z.string().optional(),
});
export type DepartamentoJsonDTO = z.infer<typeof DepartamentoCacheSchema>;

export class DepartamentoRedisMapper {
  constructor() {}

  static departamentoParaJson(departamento: Departamento): DepartamentoJsonDTO {
    return DepartamentoCacheSchema.parse({
      id: departamento.id,
      nome: departamento.nome,
      descricao: departamento.descricao,
      criadoEm: departamento.criadoEm,
      alteradoEm: departamento.alteradoEm,
      excluidoEm: departamento.excluidoEm,
    });
  }

  static jsonParaDepartamento(json: DepartamentoJsonDTO): Departamento {
    const { criadoEm, alteradoEm, excluidoEm } = json;

    return Departamento.hidratar({
      ...json,
      criadoEm: new Date(criadoEm) ?? undefined,
      alteradoEm: alteradoEm ? new Date(alteradoEm) : undefined,
      excluidoEm: excluidoEm ? new Date(excluidoEm) : undefined,
    });
  }
}
