import { ErroRegraNegocio } from '../../../error/custom/regra-negocio.error.js';
import { Preco } from '../../../global/domain/value-objects/preco.vo.js';
import type { IDepartamentoRepositoryPort } from '../../departamento/domain/departamento.port.js';
import { Produto } from '../domain/produto.domain.js';
import type { IProdutoRepositoryPort } from '../domain/produto.port.js';
import type { AtualizarProdutoInput, CadastrarProdutoInput } from './produto.types.js';

export class ProdutoService {
  constructor(
    private readonly repository: IProdutoRepositoryPort,
    private readonly deptoRepository: IDepartamentoRepositoryPort,
  ) {}

  /**
   * Cadastra um novo Produto
   */
  async cadastrar(input: CadastrarProdutoInput): Promise<Produto> {
    const pCusto = Preco.criar(input.precoCusto);
    const pVenda = Preco.criar(input.precoVenda);

    const produto = Produto.criar({ ...input, precoCusto: pCusto, precoVenda: pVenda });

    return this.repository.inserir(produto);
  }

  /**
   * Consulta um produto através do ID
   */
  async consultarPeloId(id: number): Promise<Produto> {
    const produto = await this.repository.selecionarPeloId(id);
    if (!produto) {
      throw new Error(`Produto com id ${id} não encontrado`);
    }
    return produto;
  }

  /**
   * Consulta todos os produtos
   */
  async consultarTodos(): Promise<Produto[]> {
    return await this.repository.selecionarTodos();
  }

  /**
   * Atualiza um produto
   */
  async atualizar(input: AtualizarProdutoInput) {
    const { id, departamentoId, ...props } = input;
    const produto = await this.consultarPeloId(id);
    await this.verificarSeDepartamentoExiste(departamentoId);

    produto.renomear(props.nome);
    produto.atualizarPrecificacao(Preco.criar(props.precoCusto), Preco.criar(props.precoVenda));
    if (props.sku) produto.alterarSku(props.sku);
    if (props.codigoBarras) produto.alterarCodigoBarras(props.codigoBarras);

    produto.mudarDepartamento(departamentoId);

    return this.repository.atualizar(id, produto);
  }

  /**
   * Excluir um produto
   */

  /**
   * Verifica através do ID se um departamento existe
   * @param deptoId ID do departamento
   * @throws ErroRegraNegocio - Departamento informado não existe.
   */
  private async verificarSeDepartamentoExiste(deptoId: number) {
    if (!(await this.deptoRepository.existe(deptoId))) {
      throw new ErroRegraNegocio(`Departamento informado não existe.`);
    }
  }
}
