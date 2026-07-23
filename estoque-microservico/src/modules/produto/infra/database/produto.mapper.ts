import {
  produtoInsertSchema,
  produtoUpdateSchema,
  type InsertProdutoDTO,
  type produtoTable,
  type UpdateProdutoDTO,
} from '../../../../infra/database/schemas/produto.schema.js';
import { Produto } from '../../domain/produto.domain.js';

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

  static paraInsert(produto: Produto): InsertProdutoDTO {
    return produtoInsertSchema.parse({ ...produto });
  }

  static paraUpdate(produto: Produto): UpdateProdutoDTO {
    return produtoUpdateSchema.parse({ ...produto });
  }
}
