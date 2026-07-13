import type {
  InsertDepartamentoDTO,
  UpdateDepartamentoDTO,
} from '@/infra/database/schemas/departamento.schema.js';
import type { Departamento } from './departamento.domain.js';

export interface IDepartamentoRepositoryPort {
  inserir(inp: InsertDepartamentoDTO): Promise<Departamento>;
  atualizar(id: number, inp: UpdateDepartamentoDTO): Promise<Departamento>;
  selecionarTodos(): Promise<Departamento[]>;
  selecionarPeloId(id: number): Promise<Departamento | null>;
}
