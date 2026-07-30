import {
  departamentoInsertSchema,
  departamentoUpdateSchema,
  type InsertDepartamentoDTO,
  type departamentoTable,
  type UpdateDepartamentoDTO,
} from '../../../../../infra/database/schemas/departamento.schema.js';
import { Departamento } from '../../../domain/departamento.domain.js';

export class DepartamentoMapper {
  static paraDominio(row: typeof departamentoTable.$inferSelect): Departamento {
    return Departamento.hidratar({
      ...row,
      descricao: row.descricao ?? undefined,
      alteradoEm: row.alteradoEm ?? undefined,
      excluidoEm: row.excluidoEm ?? undefined,
    });
  }

  static paraInsert(departamento: Departamento): InsertDepartamentoDTO {
    return departamentoInsertSchema.parse(departamento);
  }

  static paraUpdate(departamento: Departamento): UpdateDepartamentoDTO {
    return departamentoUpdateSchema.parse(departamento);
  }
}
