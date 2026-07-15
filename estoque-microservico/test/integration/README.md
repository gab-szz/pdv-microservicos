# Testes de Integração

Testes com objetivo de testar endpoints da API, simulando requisições HTTP e verificando respostas, bem como a comunicação com o banco de dados.

- Base para testes de integração: [Fastify + Zod + Vitest]

```typescript
let app: any;

beforeAll(async () => {
  // 1. Instancia o Fastify isolado para o contexto de testes
  app = fastify().withTypeProvider<ZodTypeProvider>();
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // 2. Registra a rota que vamos testar
  await app.register(<routeToTest>);

  // 3. Aguarda os plugins estarem prontos
  await app.ready();
});

afterAll(async () => {
  // Fecha a instância do Fastify após todos os testes
  await app.close();
});

beforeEach(async () => {
  // 4. Limpeza do Banco (Garante isolamento)
  await db.delete(<tableName>);
});
```
