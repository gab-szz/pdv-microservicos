// src/departamento/departamento.mapper.ts

import type { departamentoTable } from '@/infra/database/schemas/departamento.schema.js';
import { Departamento } from './departamento.domain.js';

/**
 * Classe para adaptar tipos de departamentos
 */
export class DepartamentoMapper {
  /**
   * Converte uma linha consultada no banco de dados para uma instância de domínio
   * @param row - Linha retornada do Banco
   * @returns Instância de Departamento (Domain)
   */
  static paraDominio(row: typeof departamentoTable.$inferSelect): Departamento {
    return Departamento.hidratar({
      ...row,
      descricao: row.descricao ?? undefined,
      alteradoEm: row.alteradoEm ?? undefined,
      excluidoEm: row.excluidoEm ?? undefined,
    });
  }
}
