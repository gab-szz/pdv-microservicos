// src/modules/departamento/domain/departamento.domain.ts

import { ErroRegraNegocio } from '../../../error/custom/regra-negocio.error.js';
import type {
  AtualizarDepartamentoInput,
  CriarDepartamentoInput,
  HidratarDepartamentoInput,
} from './departamento.types.js';

type EstadoDepartamento = {
  id?: number;
  nome: string;
  descricao?: string;
  criadoEm: Date;
  alteradoEm?: Date;
  excluidoEm?: Date;
};

/**
 * CLASSE DE DOMÍNIO
 *   DEPARTAMENTO
 */
export class Departamento {
  readonly id?: number;
  nome!: string;
  descricao?: string;
  criadoEm?: Date;
  alteradoEm?: Date;
  excluidoEm?: Date;

  private constructor(input: EstadoDepartamento) {
    this.id = input.id;
    this.nome = input.nome;
    this.descricao = input.descricao;
    this.criadoEm = input.criadoEm;
    this.alteradoEm = input.alteradoEm;
    this.excluidoEm = input.excluidoEm;
  }

  /**
   * Cria um novo departamento
   * @param input Dados para criação do departamento
   */
  static criar(input: CriarDepartamentoInput) {
    this.validarNome(input.nome);
    this.validarDescricao(input.descricao);

    const departamento = new Departamento({ ...input, criadoEm: new Date() });

    return departamento;
  }

  /**
   * Hidrata um departamento existente
   * @param input Dados para hidratação do departamento
   */
  static hidratar(input: HidratarDepartamentoInput) {
    return new Departamento(input);
  }

  /**
   * Atualiza dados da instância do departamento
   * @param input Dados para atualização do departamento
   */
  atualizar(input: AtualizarDepartamentoInput) {
    this.renomear(input.nome);
    this.alterarDescricao(input.descricao);
  }

  /**
   * Renomeia um departamento existente
   */
  renomear(nome: string) {
    if (!this.id) throw new Error('Estado inválido de entidade');
    Departamento.validarNome(nome);
    this.nome = nome;
    this.alteradoEm = new Date();
  }

  /**
   * Altera a descrição de um departamento existente
   */
  alterarDescricao(descricao?: string) {
    Departamento.validarDescricao(descricao);
    this.descricao = descricao;
    this.alteradoEm = new Date();
  }

  /**
   * Marca o departamento como excluído
   */
  excluir() {
    if (!this.id) throw new Error('Estado inválido de entidade');
    this.excluidoEm = new Date();
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
    if (nome.length <= 3) {
      throw new ErroRegraNegocio('O nome do departamento deve possuir no minimo 4 caracteres');
    }
  }

  static validarDescricao(descricao?: string) {
    if (descricao && descricao.length <= 5) {
      throw new ErroRegraNegocio('A descricao do departamento deve possuir no minimo 6 caracteres');
    }
  }
}
