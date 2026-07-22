import type { produtoTable } from '../../../infra/database/schemas/produto.schema.js';
import { Produto } from './produto.domain.js';

export class ProdutoMapper {
  static paraDominio(row: typeof produtoTable.$inferSelect) {
    return Produto.hidratar({
      ...row,
      codigoBarras: row.codigoBarras ?? undefined,
      sku: row.sku ?? undefined,
      precoCusto: Number(row.precoCusto) ?? undefined,
      precoVenda: Number(row.precoVenda) ?? undefined,
      alteradoEm: row.alteradoEm ?? undefined,
      excluidoEm: row.excluidoEm ?? undefined,
    });
  }
}
