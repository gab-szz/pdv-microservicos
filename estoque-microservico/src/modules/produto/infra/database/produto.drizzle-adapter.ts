import type { DB } from '@/infra/database/postres.drizzle.js';
import { eq } from 'drizzle-orm';
import type { IProdutoRepositoryPort } from '../../domain/produto.port.js';
import {
  produtoInsertSchema,
  produtoTable,
  produtoUpdateSchema,
  type InsertProdutoDTO,
  type UpdateProdutoDTO,
} from '@/infra/database/schemas/produto.schema.js';
import type { Produto } from '../../domain/produto.domain.js';
import { ProdutoMapper } from '../../domain/produto.mapper.js';

export class ProdutoDrizzleAdapter implements IProdutoRepositoryPort {
  constructor(private readonly db: DB) {}

  /**
   * Insere um novo Produto no banco de Dados
   * @param inp - Dados para inserção do Produto
   * @returns Produto criado
   */
  async inserir(inp: InsertProdutoDTO): Promise<Produto> {
    const [row] = await this.db.insert(produtoTable).values(produtoInsertSchema.parse(inp)).returning();

    if (!row) throw new Error();
    return ProdutoMapper.paraDominio(row);
  }

  /**
   * Seleciona todos Produtos
   * @returns Lista de Produtos
   */
  async selecionarTodos(): Promise<Produto[]> {
    const rows = await this.db.select().from(produtoTable);
    return rows ? rows.map((row) => ProdutoMapper.paraDominio(row)) : [];
  }

  /**
   * Seleciona um Produto através do ID
   * @param id Identificador único do Produto
   * @returns Lista de Produtos
   */
  async selecionarPeloId(id: number): Promise<Produto | null> {
    const [row] = await this.db.select().from(produtoTable).where(eq(produtoTable.id, id));

    return row ? ProdutoMapper.paraDominio(row) : null;
  }

  /**
   * Seleciona um Produto através do ID
   * @params ID para atualização e INP com dados a serem atualizados
   * @returns Produto atualizado
   */
  async atualizar(id: number, inp: UpdateProdutoDTO): Promise<Produto> {
    const { nome, codigoBarras, sku, precoCusto, precoVenda, departamentoId, ativo } = inp;

    const [row] = await this.db
      .update(produtoTable)
      .set(
        produtoUpdateSchema.parse({ nome, codigoBarras, sku, precoCusto, precoVenda, departamentoId, ativo }),
      )
      .where(eq(produtoTable.id, id))
      .returning();

    if (!row) throw new Error();
    return ProdutoMapper.paraDominio(row);
  }
}
