import type { Departamento } from './departamento.domain.js';

export interface IDepartamentoRepositoryPort {
  inserir(input: Departamento): Promise<Departamento>;
  atualizar(id: number, input: Departamento): Promise<Departamento>;
  selecionarTodos(): Promise<Departamento[]>;
  selecionarPeloId(id: number): Promise<Departamento | null>;
  existe(id: number): Promise<boolean>;
}
