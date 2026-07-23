import type { IDepartamentoRepositoryPort } from './domain/departamento.port.js';
import { Departamento } from './domain/departamento.domain.js';
import type {
  AtualizarDepartamentoInput,
  CriarDepartamentoInput,
} from './domain/departamento.types.js';
import type { DepartamentoIA } from './infra/IA/departamento.ia.js';
import type { DepartamentoCache } from './infra/cache/departamento.redis.js';

export class DepartamentoService {
  constructor(
    private readonly repository: IDepartamentoRepositoryPort,
    private readonly cache: DepartamentoCache,
    private readonly departamentoIA: DepartamentoIA,
  ) {}

  /**
   * Cria um novo departamento, com validações de regras de negócio em domínio
   * @param inp - Dados para criação do departamento
   * @returns Instãncia do departamento criado
   */
  async criar(inp: CriarDepartamentoInput): Promise<Departamento> {
    const departamento = Departamento.criar(inp);

    const resultado = await this.repository.inserir(departamento);
    if (!resultado) {
      throw new Error('Erro desconhecido ao inserir usuário');
    }

    this.cache.salvar(resultado);
    return resultado;
  }

  /**
   * Atualiza um departamento, com validações de regras de negócio em domínio
   * @param inp - Dados para atualização do departamento
   * @returns Instãncia do departamento criado
   */
  async atualizar(id: number, inp: AtualizarDepartamentoInput): Promise<Departamento> {
    const departamento = await this.consultarPeloId(id);
    departamento.atualizar(inp);

    const resultado = await this.repository.atualizar(id, departamento);

    this.cache.salvar(departamento);
    return resultado;
  }

  /**
   * Consulta todos departamentos cadastrados
   * @returns Lista de departamentos cadastrados
   */
  async consultar(): Promise<Departamento[]> {
    return await this.repository.selecionarTodos();
  }

  /**
   * Consulta um departamento pelo ID
   * @returns Departamento
   */
  async consultarPeloId(id: number): Promise<Departamento> {
    const chached = await this.cache.obterPeloId(id);
    if (chached !== null) {
      console.log('Cache HIT');
      return chached;
    }

    const dep = await this.repository.selecionarPeloId(id);
    if (!dep) {
      throw new Error(`Departamento com id ${id} não encontrado`);
    }

    return dep;
  }

  /**
   * Exclui um departamento
   * @param id ID do departamento
   * @returns Instãncia do departamento excluído
   */
  async excluir(id: number): Promise<Departamento> {
    const departamento = await this.consultarPeloId(id);
    departamento.excluir();
    return await this.repository.atualizar(id, departamento);
  }

  /**
   * Gera um resumo do departamento
   * @returns Resumo dos departamentos cadastrados
   */
  async resumoDepartamento(): Promise<string> {
    const resumo = await this.departamentoIA.resumoDepartamento();
    return resumo;
  }
}
