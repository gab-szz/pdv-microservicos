export interface DepartamentoDTO {
  id?: number;
  nome: string;
  descricao?: string;
  criadoEm?: Date;
  alteradoEm?: Date;
  excluidoEm?: Date;
}
export class Departamento {
  readonly id?: number;
  nome!: string;
  descricao?: string | null;
  criadoEm?: Date;
  alteradoEm?: Date | null;
  excluidoEm?: Date | null;

  private constructor(inp: Partial<DepartamentoDTO>) {
    Object.assign(this, inp);
    if (inp.id) {
      this.id = inp.id;
    }
  }

  static criar(inp: { nome?: string; descricao?: string }) {
    this.validarPropriedades(inp);
    return new Departamento(inp);
  }

  static hidratar(inp: DepartamentoDTO) {
    return new Departamento(inp);
  }

  atualizar(inp: { nome?: string; descricao?: string }) {
    const { nome, descricao } = inp;

    this.nome = Departamento.validarNome(nome);
    if (descricao) this.descricao = Departamento.validarDescricao(descricao);
    this.alteradoEm = new Date();
  }

  excluir() {
    this.excluidoEm = new Date();
  }

  static validarPropriedades(props: Partial<Departamento>) {
    this.validarNome(props.nome);
    this.validarDescricao(props.descricao);
  }

  static validarNome(nome: string | undefined) {
    if (!nome || nome.length < 3) {
      throw new Error('O nome do departamento deve possuir ao menos 4 caracteres.');
    }
    return nome;
  }

  static validarDescricao(descricao?: string | null | undefined) {
    if (descricao && descricao.length < 3) {
      throw new Error('A descricao do departamento deve possuir ao menos 6 caracteres.');
    }
    return descricao;
  }
}
