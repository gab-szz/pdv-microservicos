import { describe, test, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import produtoRoutes from '../../../../src/modules/produto/infra/in/http/produto.controller.js';
import { instanciarModuloParaTestes } from '../../utils.js';
import { db } from '../../../../src/infra/database/postres.drizzle.js';
import { produtoTable } from '../../../../src/infra/database/schemas/produto.schema.js';

describe('Módulo de Produtos (Integração)', () => {
  let app: any;
  const propriedadesValidas = {
    nome: 'Refrigerante 2L',
    codigoBarras: '12325895',
    sku: 'PRD-001',
    precoCusto: 2.7,
    precoVenda: 3.5,
    departamentoId: 1,
  };

  beforeAll(async () => {
    // Instancia e registra as rotas de produtos na instância de teste
    app = await instanciarModuloParaTestes(app, produtoRoutes);
  });

  afterAll(async () => {
    // Fecha a instância do Fastify após todos os testes
    await app.close();
  });

  beforeEach(async () => {
    // 4. Limpeza do Banco (Garante isolamento)
    await db.delete(produtoTable);
  });

  // --- CENÁRIOS DE TESTE ---

  describe('POST /', () => {
    test('Deve criar um produto com sucesso e retornar os dados corretos', async () => {
      const response = await app.inject({ method: 'POST', url: '/', payload: propriedadesValidas });

      if (response.statusCode === 500) {
        console.log('Erro:', response.payload);
      }

      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.payload);
      console.log('Sucesso:', body);

      expect(body).toHaveProperty('id');
      expect(body.nome).toBe(propriedadesValidas.nome);
      expect(body.codigoBarras).toBe(propriedadesValidas.codigoBarras);
      expect(body.sku).toBe(propriedadesValidas.sku);
      expect(body.precoCusto).toBe(propriedadesValidas.precoCusto);
      expect(body.precoVenda).toBe(propriedadesValidas.precoVenda);
      expect(body.departamentoId).toBe(propriedadesValidas.departamentoId);
      expect(body).toHaveProperty('criadoEm');
      expect(body.alteradoEm).toBeUndefined();
    });
  });
});
