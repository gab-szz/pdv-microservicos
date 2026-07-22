export type CriarProdutoInput = {
  nome: string;
  codigoBarras?: string;
  sku?: string;
  precoCusto: number;
  precoVenda: number;
  departamentoId: number;
};

export type HidratarProdutoInput = {
  id: number;
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
