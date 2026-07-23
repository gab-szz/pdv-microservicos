import type { Produto } from './produto.domain.js';

export interface IProdutoRepositoryPort {
  inserir(input: Produto): Promise<Produto>;
  atualizar(id: number, inp: Produto): Promise<Produto>;
  selecionarTodos(): Promise<Produto[]>;
  selecionarPeloId(id: number): Promise<Produto | null>;
}
