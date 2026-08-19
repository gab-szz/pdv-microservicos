import { db } from '../../infra/database/postres.drizzle.js';
import { ProdutoDrizzleAdapter } from './infra/out/persistence/produto.drizzle-adapter.js';
import { ProdutoService } from './application/produto.service.js';
import { DepartamentoDrizzleAdapter } from '../departamento/infra/out/persistence/departamento.drizzle-adapter.js';

class ProdutoModule {
  service(): ProdutoService {
    const repository = new ProdutoDrizzleAdapter(db);
    const deptoRepository = new DepartamentoDrizzleAdapter({ db });
    return new ProdutoService(repository, deptoRepository);
  }
}

export default new ProdutoModule();
