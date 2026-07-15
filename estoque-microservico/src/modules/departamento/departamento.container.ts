import type { DB } from '@/infra/database/postres.drizzle.js';
import { DepartamentoDrizzleAdapter } from './infra/database/departamento.drizzle-adapter.js';
import { DepartamentoService } from './departamento.service.js';
import { DepartamentoIA } from './infra/IA/departamento.ia.js';
import { DepartamentoCache } from './infra/cache/departamento.redis.js';

/**
 * Função responsável por instânciar classes utilizadas no módulo de departamento
 * @param db Conexão com o Banco de Dados
 * @returns Service - Instãncia da classe de Serviço
 */
export function departamentoContainer(db: DB) {
  const adapter = new DepartamentoDrizzleAdapter(db);
  const service = new DepartamentoService(adapter, new DepartamentoCache(), new DepartamentoIA());

  return service;
}
