import type { DB } from '@/infra/database/postres.drizzle.js';
import {
  departamentoTable,
  type InsertDepartamentoDTO,
  departamentoInsertSchema,
  type UpdateDepartamentoDTO,
  departamentoUpdateSchema,
} from '@/infra/database/schemas/departamento.schema.js';
import type { IDepartamentoRepositoryPort } from '../../domain/departamento.port.js';
import { Departamento } from '../../domain/departamento.domain.js';
import { eq } from 'drizzle-orm';
import { DepartamentoMapper } from '../../domain/departamento.mapper.js';

export class DepartamentoDrizzleAdapter implements IDepartamentoRepositoryPort {
  constructor(private readonly db: DB) {}

  /**
   * Insere um novo Departamento no banco de Dados
   * @param inp - Dados para inserção do Departamento
   * @returns Departamento criado
   */
  async inserir(inp: InsertDepartamentoDTO): Promise<Departamento> {
    const [row] = await this.db
      .insert(departamentoTable)
      .values(departamentoInsertSchema.parse(inp))
      .returning();

    if (!row) throw new Error();
    return DepartamentoMapper.paraDominio(row);
  }

  /**
   * Seleciona todos departamentos
   * @returns Lista de Departamentos
   */
  async selecionarTodos(): Promise<Departamento[]> {
    const rows = await this.db.select().from(departamentoTable);
    return rows ? rows.map((row) => DepartamentoMapper.paraDominio(row)) : [];
  }

  /**
   * Seleciona um departamento através do ID
   * @param id Identificador único do Departamento
   * @returns Lista de Departamentos
   */
  async selecionarPeloId(id: number): Promise<Departamento | null> {
    const [row] = await this.db.select().from(departamentoTable).where(eq(departamentoTable.id, id));

    return row ? DepartamentoMapper.paraDominio(row) : null;
  }

  /**
   * Seleciona um departamento através do ID
   * @params ID para atualização e INP com dados a serem atualizados
   * @returns Departamento atualizado
   */
  async atualizar(id: number, inp: UpdateDepartamentoDTO): Promise<Departamento> {
    const { nome, descricao, alteradoEm } = inp;

    const [row] = await this.db
      .update(departamentoTable)
      .set(departamentoUpdateSchema.parse({ nome, descricao, alteradoEm }))
      .where(eq(departamentoTable.id, id))
      .returning();

    if (!row) throw new Error();
    return DepartamentoMapper.paraDominio(row);
  }
}
