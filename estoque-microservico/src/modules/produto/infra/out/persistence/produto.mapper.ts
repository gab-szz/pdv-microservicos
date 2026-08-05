import { Preco } from '../../../../../global/domain/value-objects/preco.vo.js';
import {
  produtoInsertSchema,
  produtoUpdateSchema,
  type InsertProdutoDTO,
  type produtoTable,
  type UpdateProdutoDTO,
} from '../../../../../infra/database/schemas/produto.schema.js';
import { Produto } from '../../../domain/produto.domain.js';

export class ProdutoDrizzleMapper {
  static paraDominio(row: typeof produtoTable.$inferSelect) {
    return Produto.hidratar({
      ...row,
      codigoBarras: row.codigoBarras ?? undefined,
      sku: row.sku ?? undefined,
      precoCusto: Preco.criar(row.precoCusto),
      precoVenda: Preco.criar(row.precoVenda),
      alteradoEm: row.alteradoEm ?? undefined,
      excluidoEm: row.excluidoEm ?? undefined,
    });
  }

  static paraInsert(produto: Produto): InsertProdutoDTO {
    return produtoInsertSchema.parse({
      ...produto,
      precoCusto: produto.precoCusto.toString(),
      precoVenda: produto.precoVenda.toString(),
    });
  }

  static paraUpdate(produto: Produto): UpdateProdutoDTO {
    return produtoUpdateSchema.parse({
      ...produto,
      precoCusto: produto.precoCusto.toString(),
      precoVenda: produto.precoVenda.toString(),
    });
  }
}
