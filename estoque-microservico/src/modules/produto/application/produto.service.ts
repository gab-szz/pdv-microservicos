import { Preco } from '../../../global/domain/value-objects/preco.vo.js';
import { Produto } from '../domain/produto.domain.js';
import type { IProdutoRepositoryPort } from '../domain/produto.port.js';
import type { CadastrarProdutoInput } from './produto.types.js';

export class ProdutoService {
  constructor(private readonly repository: IProdutoRepositoryPort) {}

  async cadastrar(input: CadastrarProdutoInput): Promise<Produto> {
    const pCusto = Preco.criar(input.precoCusto);
    const pVenda = Preco.criar(input.precoVenda);

    const produto = Produto.criar({ ...input, precoCusto: pCusto, precoVenda: pVenda });

    return this.repository.inserir(produto);
  }

  async consultarPeloId(id: number): Promise<Produto> {
    const produto = await this.repository.selecionarPeloId(id);
    if (!produto) {
      throw new Error(`Produto com id ${id} não encontrado`);
    }
    return produto;
  }
}
