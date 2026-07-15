import { Departamento } from '@/modules/departamento/domain/departamento.domain.js';
import { describe, expect, it } from 'vitest';

describe('Departamento', () => {
  describe('criar', () => {
    it('Deve criar um departamento com sucesso', async () => {
      const input = {
        nome: 'Departamento Teste',
        descricao: 'Descrição do departamento de teste',
      };

      const departamento = Departamento.criar(input);

      expect(departamento).toBeInstanceOf(Departamento);
      expect(departamento.nome).toBe(input.nome);
      expect(departamento.descricao).toBe(input.descricao);
    });
  });
});
