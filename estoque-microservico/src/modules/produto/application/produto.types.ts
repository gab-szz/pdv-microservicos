export type CadastrarProdutoInput = {
  nome: string;
  codigoBarras?: string;
  sku?: string;
  precoCusto: number;
  precoVenda: number;
  departamentoId: number;
};
export type AtualizarProdutoInput = CadastrarProdutoInput & { id: number };
