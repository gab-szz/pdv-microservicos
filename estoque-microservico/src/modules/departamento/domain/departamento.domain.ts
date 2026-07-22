// src/modules/produto/domain/departamento.domain.ts

export interface DepartamentoDTO {
  id?: number;
  nome: string;
  descricao?: string;
  criadoEm?: Date;
  alteradoEm?: Date;
  excluidoEm?: Date;
}

/**
 * CLASSE DE DOMÍNIO
 *   DEPARTAMENTO
 */
export class Departamento {
  readonly id?: number;
  nome!: string;
  descricao?: string | null;
  criadoEm?: Date;
  alteradoEm?: Date | null;
  excluidoEm?: Date | null;

  private constructor(inp: Partial<DepartamentoDTO>) {
    Object.assign(this, inp);
  }

  /**
   * Cria um novo departamento
   * @param inp Dados para criação do departamento
   */
  static criar(inp: { nome?: string; descricao?: string }) {
    this.validarPropriedades(inp);
    return new Departamento(inp);
  }

  /**
   * Transforma um objeto plano em instância de departamento
   * @param inp Dados para hidratar o departamento
   */
  static hidratar(inp: DepartamentoDTO) {
    return new Departamento(inp);
  }

  /**
   * Atualiza dados da instância do departamento
   * @param inp Dados para atualização do departamento
   */
  atualizar(inp: { nome?: string; descricao?: string }) {
    const { nome, descricao } = inp;

    this.nome = Departamento.validarNome(nome);
    if (descricao) this.descricao = Departamento.validarDescricao(descricao);
    this.alteradoEm = new Date();
  }

  /**
   *
   */
  excluir() {
    this.excluidoEm = new Date();
  }

  /**
   * Valida se todas as propriedades informadas pros campos de departamento são válidas
   * @param props Dados a serem validados
   */
  static validarPropriedades(props: Partial<DepartamentoDTO>) {
    this.validarNome(props.nome);
    this.validarDescricao(props.descricao);
  }

  /**
   * Valida se o nome informado é válido
   * @param nome
   * @returns
   */
  static validarNome(nome: string | undefined) {
    if (!nome || nome.length < 3) {
      throw new Error('O nome do departamento deve possuir ao menos 4 caracteres.');
    }
    return nome;
  }

  /**
   * Valida se a descrição informada é válida
   * @param descricao
   * @returns
   */
  static validarDescricao(descricao?: string | null | undefined) {
    if (descricao && descricao.length < 3) {
      throw new Error('A descricao do departamento deve possuir ao menos 6 caracteres.');
    }
    return descricao;
  }
}
