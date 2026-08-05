import { ErroRegraNegocio } from '@/error/custom/regra-negocio.error.js';
import { Produto } from '@/modules/produto/domain/produto.domain.js';
import { describe, expect, it } from 'vitest';
import { Preco } from '../../../../../../src/global/domain/value-objects/preco.vo.js';

describe('Produto', () => {
  const inputValido = {
    nome: 'Produto Teste',
    codigoBarras: '7891234567895',
    sku: 'PROD-001',
    precoCusto: Preco.criar(10),
    precoVenda: Preco.criar(15),
    departamentoId: 1,
  };

  describe('criar', () => {
    it('deve criar um produto ativo com sucesso', () => {
      const produto = Produto.criar(inputValido);

      expect(produto).toBeInstanceOf(Produto);
      expect(produto.nome).toBe(inputValido.nome);
      expect(produto.ativo).toBe(true);
      expect(produto.criadoEm).toBeInstanceOf(Date);
    });

    it('deve rejeitar preço de venda menor que o preço de custo', () => {
      expect(() =>
        Produto.criar({
          ...inputValido,
          precoCusto: Preco.criar(20),
          precoVenda: Preco.criar(10),
        }),
      ).toThrow(ErroRegraNegocio);
    });

    it('deve rejeitar código de barras inválido', () => {
      expect(() =>
        Produto.criar({
          ...inputValido,
          codigoBarras: 'ABC123',
        }),
      ).toThrow(ErroRegraNegocio);
    });

    it('deve rejeitar SKU inválido', () => {
      expect(() =>
        Produto.criar({
          ...inputValido,
          sku: 'sku com espaço',
        }),
      ).toThrow(ErroRegraNegocio);
    });
  });

  describe('alterações', () => {
    it('deve marcar alteração ao mudar departamento', () => {
      const produto = Produto.hidratar({
        ...inputValido,
        id: 1,
        ativo: true,
        criadoEm: new Date(),
      });

      produto.mudarDepartamento(2);

      expect(produto.departamentoId).toBe(2);
      expect(produto.alteradoEm).toBeInstanceOf(Date);
    });
  });
});
