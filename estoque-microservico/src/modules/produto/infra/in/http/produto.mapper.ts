import type { Produto } from '../../../domain/produto.domain.js';
import type { ProdutoHttpDTO } from './produto.schema.js';

export class ProdutoHttpMapper {
  static paraResposta(produto: Produto): ProdutoHttpDTO {
    return {
      id: produto.id!,
      nome: produto.nome,
      codigoBarras: produto.codigoBarras ?? null,
      sku: produto.sku ?? null,
      precoCusto: produto.precoCusto.toNumber(),
      precoVenda: produto.precoVenda.toNumber(),
      ativo: produto.ativo,
      departamentoId: produto.departamentoId,
      criadoEm: produto.criadoEm!,
    };
  }
}
