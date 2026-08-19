import type { DB } from '@/infra/database/postres.drizzle.js';
import { eq } from 'drizzle-orm';
import type { IDepartamentoRepositoryPort } from '../../../domain/departamento.port.js';
import { departamentoTable } from '@/infra/database/schemas/departamento.schema.js';
import type { Departamento } from '../../../domain/departamento.domain.js';
import { DepartamentoMapper } from './departamento.mapper.js';
import { DatabaseError } from 'pg';

export class DepartamentoDrizzleAdapter implements IDepartamentoRepositoryPort {
  private readonly db: DB;

  constructor({ db }: { db: DB }) {
    this.db = db;
  }

  /**
   * Insere um novo Departamento no banco de Dados
   * @param input - Dados para inserção do Departamento
   * @returns Departamento criado
   */
  async inserir(input: Departamento): Promise<Departamento> {
    const [row] = await this.db
      .insert(departamentoTable)
      .values(DepartamentoMapper.paraInsert(input))
      .returning();

    if (!row) throw new DatabaseError('Erro desconhecido no banco de dados', 1, 'error');
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
   * @returns Departamento ou null
   */
  async selecionarPeloId(id: number): Promise<Departamento | null> {
    const [row] = await this.db
      .select()
      .from(departamentoTable)
      .where(eq(departamentoTable.id, id));

    return row ? DepartamentoMapper.paraDominio(row) : null;
  }

  /**
   * Verifica se um departamento existe no Banco de Dados através do id
   * @param id Identificador único do Departamento
   * @returns Boolean
   */
  async existe(id: number): Promise<boolean> {
    const [row] = await this.db
      .select()
      .from(departamentoTable)
      .where(eq(departamentoTable.id, id));

    return row ? true : false;
  }

  /**
   * Atualiza um departamento através do ID
   * @param id ID para atualização
   * @param input Dados a serem atualizados
   * @returns Departamento atualizado
   */
  async atualizar(id: number, input: Departamento): Promise<Departamento> {
    const [row] = await this.db
      .update(departamentoTable)
      .set(DepartamentoMapper.paraUpdate(input))
      .where(eq(departamentoTable.id, id))
      .returning();

    if (!row) throw new DatabaseError('Erro desconhecido no banco de dados', 1, 'error');
    return DepartamentoMapper.paraDominio(row);
  }
}
