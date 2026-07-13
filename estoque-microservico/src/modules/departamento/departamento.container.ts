import type { DB } from '@/infra/database/postres.drizzle.js';
import { DepartamentoDrizzleAdapter } from './infra/departamento.drizzle-adapter.js';
import { DepartamentoService } from './departamento.service.js';
import { DepartamentoIA } from './infra/departamento.ia.js';

/**
 * Função responsável por instânciar classes utilizadas no módulo de departamento
 * @param db Conexão com o Banco de Dados
 * @returns Service - Instãncia da classe de Serviço
 */
export function departamentoContainer(db: DB) {
  const adapter = new DepartamentoDrizzleAdapter(db);
  const service = new DepartamentoService(adapter, new DepartamentoIA());

  return service;
}
