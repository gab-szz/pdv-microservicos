// src/modules/produto/domain/produto.domain.ts

import { ErroRegraNegocio } from '../../../error/custom/regra-negocio.error.js';
import type { CriarProdutoInput } from './produto.types.js';

/**
 * TYPES EXCLUSIVOS
 */

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
type HidratarProdutoInput = EstadoProduto & { id: number };

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
   */
  static criar(input: CriarProdutoInput) {
    this.validarNome(input.nome);
    this.validarCodigoBarras(input.codigoBarras);
    this.validarSku(input.sku);
    this.validarPrecoCusto(input.precoCusto);
    this.validarPrecoVenda(input.precoVenda);
    this.validarPrecificacao(input.precoCusto, input.precoVenda);
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
    this.marcarAlteracao();
  }

  /**
   * Altera o código de barras do produto
   */
  alterarCodigoBarras(codigoBarras?: string) {
    Produto.validarCodigoBarras(codigoBarras);
    this.codigoBarras = codigoBarras;
    this.marcarAlteracao();
  }

  /**
   * Altera o SKU do produto
   */
  alterarSku(sku?: string) {
    Produto.validarSku(sku);
    this.sku = sku;
    this.marcarAlteracao();
  }

  /**
   * Muda o id do departamento do produto
   */
  mudarDepartamento(id: number) {
    Produto.validarId(id);
    this.departamentoId = id;
    this.marcarAlteracao();
  }

  /**
   * Reativa o produto
   */
  ativar() {
    this.ativo = true;
    this.marcarAlteracao();
  }

  /**
   * Desativa o produto
   */
  desativar() {
    this.ativo = false;
    this.marcarAlteracao();
  }

  /**
   * Marca o produto como excluído
   */
  excluir() {
    if (!this.id) throw new Error('Estado inválido de entidade');
    this.ativo = false;
    this.excluidoEm = new Date();
    this.marcarAlteracao();
  }

  /**
   * Atualizar preço de Custo
   */
  atualizarPrecoCusto(preco: number) {
    Produto.validarPrecoCusto(preco);
    if (preco > this.precoVenda)
      throw new ErroRegraNegocio('O preço de custo informado superior ao preço de venda atual');
    this.precoCusto = preco;
    this.marcarAlteracao();
  }

  /**
   * Atualizar preço de Venda
   */
  atualizarPrecoVenda(preco: number) {
    Produto.validarPrecoVenda(preco);
    if (preco < this.precoCusto)
      throw new ErroRegraNegocio('O preço de venda informado é inferior ao preço de custo atual');
    this.precoVenda = preco;
    this.marcarAlteracao();
  }

  /**
   * Atualizar preços de produto
   * @param precoCusto Novo preço de custo do produto
   * @param precoVenda Novo preço de venda do produto
   */
  atualizarPrecificacao(precoCusto: number, precoVenda: number) {
    Produto.validarPrecificacao(precoCusto, precoVenda);
    this.precoCusto = precoCusto;
    this.precoVenda = precoVenda;
    this.marcarAlteracao();
  }

  /**
   * Hidrata um produto existente
   */
  static hidratar(input: HidratarProdutoInput) {
    return new Produto(input);
  }

  /**
   * Funções de Validação e Regra de Negócio
   */

  /**
   * Valida se o ID informado é válido
   */
  static validarId(id: number) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new ErroRegraNegocio('O ID deve ser um valor positivo');
    }
  }

  /**
   * Valida se o nome informado é válido
   */
  static validarNome(nome: string) {
    if (nome.trim().length < 4) {
      throw new ErroRegraNegocio('O nome do produto deve possuir no minimo 4 caracteres');
    }

    if (nome.length > 150) {
      throw new ErroRegraNegocio('O nome do produto deve possuir no máximo 150 caracteres');
    }
  }

  /**
   * Valida se o código de barras informado é válido
   */
  static validarCodigoBarras(codigoBarras?: string) {
    if (!codigoBarras) return;

    if (!/^\d+$/.test(codigoBarras)) {
      throw new ErroRegraNegocio('O código de barras deve conter apenas números');
    }

    if (![8, 12, 13, 14].includes(codigoBarras.length)) {
      throw new ErroRegraNegocio('O código de barras deve possuir 8, 12, 13 ou 14 dígitos');
    }
  }

  /**
   * Valida se o SKU informado é válido
   */
  static validarSku(sku?: string) {
    if (!sku) return;

    if (sku.length < 3 || sku.length > 50) {
      throw new ErroRegraNegocio('O SKU deve possuir entre 3 e 50 caracteres');
    }

    if (!/^[A-Z0-9_-]+$/.test(sku)) {
      throw new ErroRegraNegocio('O SKU deve conter apenas letras maiúsculas, números, hífen ou underline');
    }
  }

  /**
   * Valida se o preço de custo informado é válido
   * @param preco Preço de custo a ser validado
   */
  static validarPrecoCusto(preco: number) {
    if (preco <= 0) {
      throw new ErroRegraNegocio('O preço de custo deve ser um valor positivo');
    }
  }

  /**
   * Valida se o preço de venda informado é válido
   */
  static validarPrecoVenda(preco: number) {
    if (preco <= 0) {
      throw new ErroRegraNegocio('O preço de venda deve ser um valor positivo');
    }
  }

  /**
   * Valida se a precificação do produto é válida
   * @param precoCusto Preço de custo a ser validado
   * @param precoVenda Preço de venda a ser validado
   */
  static validarPrecificacao(precoCusto: number, precoVenda: number) {
    Produto.validarPrecoCusto(precoCusto);
    Produto.validarPrecoVenda(precoVenda);

    if (precoCusto > precoVenda) {
      throw new ErroRegraNegocio('O preço de custo é superior ao preço de venda');
    }
  }

  /**
   * Marca a data de alteração do produto
   */
  private marcarAlteracao() {
    this.alteradoEm = new Date();
  }
}
