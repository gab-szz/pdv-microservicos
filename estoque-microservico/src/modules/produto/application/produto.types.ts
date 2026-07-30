export type CadastrarProdutoInput = {
  nome: string;
  codigoBarras?: string;
  sku?: string;
  precoCusto: number;
  precoVenda: number;
  departamentoId: number;
};
