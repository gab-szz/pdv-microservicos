export type CriarDepartamentoInput = {
  nome: string;
  descricao?: string;
};

export type AtualizarDepartamentoInput = {
  nome: string;
  descricao?: string;
};

export type HidratarDepartamentoInput = {
  id: number;
  nome: string;
  descricao?: string;
  criadoEm: Date;
  alteradoEm?: Date;
  excluidoEm?: Date;
};
