import type { DB } from '@/infra/database/postres.drizzle.js';
import { eq } from 'drizzle-orm';
import type { IProdutoRepositoryPort } from '../../../domain/produto.port.js';
import { produtoTable } from '@/infra/database/schemas/produto.schema.js';
import type { Produto } from '../../../domain/produto.domain.js';
import { ProdutoDrizzleMapper } from './produto.mapper.js';
import { DatabaseError } from 'pg';

export class ProdutoDrizzleAdapter implements IProdutoRepositoryPort {
  constructor(private readonly db: DB) {}

  /**
   * Insere um novo Produto no banco de Dados
   * @param inp - Dados para inserção do Produto
   * @returns Produto criado
   */
  async inserir(input: Produto): Promise<Produto> {
    const [row] = await this.db
      .insert(produtoTable)
      .values(ProdutoDrizzleMapper.paraInsert(input))
      .returning();

    if (!row) throw new DatabaseError('Erro desconhecido no banco de dados', 1, 'error');
    return ProdutoDrizzleMapper.paraDominio(row);
  }

  /**
   * Seleciona todos Produtos
   * @returns Lista de Produtos
   */
  async selecionarTodos(): Promise<Produto[]> {
    const rows = await this.db.select().from(produtoTable);
    return rows ? rows.map((row) => ProdutoDrizzleMapper.paraDominio(row)) : [];
  }

  /**
   * Seleciona um Produto através do ID
   * @param id Identificador único do Produto
   * @returns Lista de Produtos
   */
  async selecionarPeloId(id: number): Promise<Produto | null> {
    const [row] = await this.db.select().from(produtoTable).where(eq(produtoTable.id, id));

    return row ? ProdutoDrizzleMapper.paraDominio(row) : null;
  }

  /**
   * Seleciona um Produto através do ID
   * @params ID para atualização e INP com dados a serem atualizados
   * @returns Produto atualizado
   */
  async atualizar(id: number, input: Produto): Promise<Produto> {
    const [row] = await this.db
      .update(produtoTable)
      .set(ProdutoDrizzleMapper.paraUpdate(input))
      .where(eq(produtoTable.id, id))
      .returning();

    if (!row) throw new DatabaseError('Erro desconhecido no banco de dados', 1, 'error');
    return ProdutoDrizzleMapper.paraDominio(row);
  }
}
