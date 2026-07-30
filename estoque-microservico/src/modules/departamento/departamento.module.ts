import { db } from '../../infra/database/postres.drizzle.js';
import { DepartamentoDrizzleAdapter } from './infra/out/persistence/departamento.drizzle-adapter.js';
import { DepartamentoService } from './application/departamento.service.js';
import { DepartamentoCache } from './infra/out/cache/departamento.redis.js';
import { DepartamentoIA } from './infra/out/ia/departamento.ia.js';

class DepartamentoModule {
  service(): DepartamentoService {
    const repository = new DepartamentoDrizzleAdapter(db);
    return new DepartamentoService(repository, new DepartamentoCache(), new DepartamentoIA());
  }
}

export default new DepartamentoModule();
