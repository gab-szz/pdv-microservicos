import type { InsertProdutoDTO, UpdateProdutoDTO } from '@/infra/database/schemas/produto.schema.js';
import type { Produto } from './produto.domain.js';

export interface IProdutoRepositoryPort {
  inserir(inp: InsertProdutoDTO): Promise<Produto>;
  atualizar(id: number, inp: UpdateProdutoDTO): Promise<Produto>;
  selecionarTodos(): Promise<Produto[]>;
  selecionarPeloId(id: number): Promise<Produto | null>;
}
