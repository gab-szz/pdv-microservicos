import { describe, test, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { departamentoTable } from '@/infra/database/schemas/departamento.schema.js';
import { db } from '@/infra/database/postres.drizzle.js';
import departamentoRoutes from '@/modules/departamento/departamento.controller.js';

describe('Módulo de Departamento (Integração)', () => {
  let app: any;

  beforeAll(async () => {
    // 1. Instancia o Fastify isolado para o contexto de testes
    app = fastify().withTypeProvider<ZodTypeProvider>();
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    // 2. Registra a rota que vamos testar
    await app.register(departamentoRoutes);

    // 3. Aguarda os plugins estarem prontos
    await app.ready();
  });

  afterAll(async () => {
    // Fecha a instância do Fastify após todos os testes
    await app.close();
  });

  beforeEach(async () => {
    // 4. Limpeza do Banco (Garante isolamento)
    await db.delete(departamentoTable);
  });

  // --- CENÁRIOS DE TESTE ---

  describe('POST /', () => {
    test('Deve criar um departamento com sucesso e retornar os dados corretos', async () => {
      // Massa de teste válida
      const payload = {
        nome: 'Tecnologia da Informação',
        descricao: 'Setor responsável pelo desenvolvimento e infraestrutura.',
      };

      // Dispara a requisição simulada pelo Fastify Inject
      const response = await app.inject({
        method: 'POST',
        url: '/',
        payload,
      });

      if (response.statusCode === 500) {
        console.log('Erro:', response.payload);
      }

      // Asserts de HTTP
      expect(response.statusCode).toBe(200);

      const body = JSON.parse(response.payload);
      console.log('Sucesso:', body);

      // Asserts do Payload de Resposta (omitindo alteradoEm e excluidoEm conforme seu schema)
      expect(body).toHaveProperty('id');
      expect(body.nome).toBe(payload.nome);
      expect(body.descricao).toBe(payload.descricao);
      expect(body).toHaveProperty('criadoEm');
      expect(body.alteradoEm).toBeUndefined();
    });

    test('Deve retornar 400 se o payload violar o Zod schema (nome curto)', async () => {
      const payload = {
        nome: 'TI', // Zod exige min(4) no criarDepartamentoHttpSchema
        descricao: 'Descrição válida com mais de 6 caracteres',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/',
        payload,
      });

      expect(response.statusCode).toBe(400);
    });

    test('Deve estourar erro de negócio se violar a regra da Entidade (descrição curta)', async () => {
      const payload = {
        nome: 'Contabilidade',
        descricao: '.', // Vai quebrar na Entidade
      };

      const response = await app.inject({
        method: 'POST',
        url: '/',
        payload,
      });

      expect(response.statusCode).toBe(500);
    });
  });

  describe('GET /', () => {
    test('Deve retornar uma lista vazia quando não houver departamentos', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload);
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(0);
    });

    test('Deve retornar todos os departamentos cadastrados', async () => {
      // Arrange: Insere dados direto pelo Drizzle para preparar o cenário do GET
      await db.insert(departamentoTable).values([
        { nome: 'Recursos Humanos', descricao: 'Gestão de pessoas e talentos.' },
        { nome: 'Financeiro', descricao: 'Controle de contas e faturamento.' },
      ]);

      // Act: Chama a rota
      const response = await app.inject({
        method: 'GET',
        url: '/',
      });

      // Assert
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload);

      expect(body.length).toBe(2);
      expect(body[0].nome).toBe('Recursos Humanos');
      expect(body[1].nome).toBe('Financeiro');
    });
  });

  describe('PUT /', () => {
    test('Deve atualizar com sucesso um departamento', async () => {
      const [row] = await db
        .insert(departamentoTable)
        .values([{ nome: 'Recursos Humanos', descricao: 'Gestão de pessoas e talentos.' }])
        .returning();

      const response = await app.inject({
        method: 'PUT',
        url: row!.id,
        payload: {
          nome: 'Tecnologia da Informação',
          descricao: 'Descrição válida com mais de 7 caracteres.',
        },
      });

      if (response.statusCode !== 200) {
        console.log(response);
      }
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload);

      expect(body.nome).toBe('Tecnologia da Informação');
      expect(body.descricao).toBe('Descrição válida com mais de 7 caracteres.');
    });
  });
});
