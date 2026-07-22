// src/modules/produto/domain/produto.domain.ts

import { ErroRegraNegocio } from '../../../error/custom/regra-negocio.error.js';
import type { CriarProdutoInput, HidratarProdutoInput } from './produto.types.js';

type EstadoProduto = {
  id?: number;
  nome: string;
  codigoBarras?: string;
  sku?: string;
  precoCusto: number;
  precoVenda: number;
  ativo: boolean;
  departamentoId: number;
  criadoEm: Date;
  alteradoEm?: Date;
  excluidoEm?: Date;
};

/**
 * CLASSE DE DOMÍNIO
 *     PRODUTO
 */
export class Produto {
  readonly id?: number;
  nome!: string;
  codigoBarras?: string;
  sku?: string;
  precoCusto!: number;
  precoVenda!: number;
  ativo!: boolean;
  departamentoId!: number;
  criadoEm?: Date;
  alteradoEm?: Date;
  excluidoEm?: Date;

  private constructor(input: EstadoProduto) {
    this.id = input.id;
    this.nome = input.nome;
    this.codigoBarras = input.codigoBarras;
    this.sku = input.sku;
    this.precoCusto = input.precoCusto;
    this.precoVenda = input.precoVenda;
    this.departamentoId = input.departamentoId;
    this.ativo = input.ativo;
    this.criadoEm = input.criadoEm;
    this.alteradoEm = input.alteradoEm;
    this.excluidoEm = input.excluidoEm;
  }

  /**
   * Cria um novo produto
   * @param input Dados para criação do produto
   */
  static criar(input: CriarProdutoInput) {
    this.validarNome(input.nome);
    this.validarPrecoCusto(input.precoCusto);
    this.validarPrecoVenda(input.precoVenda);
    this.validarId(input.departamentoId);

    const produto = new Produto({ ...input, ativo: true, criadoEm: new Date() });

    return produto;
  }

  /**
   * Renomeia um produto existente
   */
  renomear(nome: string) {
    if (!this.id) throw new Error('Estado inválido de entidade');
    Produto.validarNome(nome);
    this.nome = nome;
  }

  mudarDepartamento(id: number) {
    Produto.validarId(id);
    this.departamentoId = id;
  }

  /**
   * Reativa o produto
   */
  ativar() {
    this.ativo = true;
  }

  /**
   * Desativa o produto
   */
  desativar() {
    this.ativo = false;
  }

  /**
   * Atualizar preço de Custo
   */
  atualizarPrecoCusto(preco: number) {
    Produto.validarPrecoCusto(preco);
    if (preco > this.precoVenda)
      throw new ErroRegraNegocio('O preço de custo informado superior ao preço de venda atual');
    this.precoCusto = preco;
  }

  /**
   * Atualizar preço de Venda
   */
  atualizarPrecoVenda(preco: number) {
    Produto.validarPrecoVenda(preco);
    if (preco < this.precoCusto)
      throw new ErroRegraNegocio('O preço de venda informado é inferior ao preço de custo atual');
    this.precoVenda = preco;
  }

  /**
   * Atualizar preços de produto
   */
  atualizarPrecificacao(precoCusto: number, precoVenda: number) {
    Produto.validarPrecoCusto(precoCusto);
    Produto.validarPrecoVenda(precoVenda);
    if (precoCusto > precoVenda) {
      throw new ErroRegraNegocio('O preço de custo é superior ao preço de venda');
    }
    this.precoCusto = precoCusto;
    this.precoVenda = precoVenda;
  }

  /**
   * Hidrata um produto existente
   * @param input Dados para hidratação do produto
   */
  static hidratar(input: HidratarProdutoInput) {
    return new Produto(input);
  }

  /**
   * Funções de Validação e Regra de Negócio
   */
  static validarId(id: number) {
    if (id <= 0) {
      throw new ErroRegraNegocio('O ID deve ser um valor positivo');
    }
  }

  static validarNome(nome: string) {
    if (nome.length <= 4) {
      throw new ErroRegraNegocio('O nome do produto deve possuir no minimo 4 caracteres');
    }
  }

  static validarCodigoBarras() {}

  static validarSku() {}

  static validarPrecoCusto(preco: number) {
    if (preco < 0) {
      throw new ErroRegraNegocio('O preço de custo deve ser um valor positivo');
    }
  }

  static validarPrecoVenda(preco: number) {
    if (preco < 0) {
      throw new ErroRegraNegocio('O preço de venda deve ser um valor positivo');
    }
  }
}
