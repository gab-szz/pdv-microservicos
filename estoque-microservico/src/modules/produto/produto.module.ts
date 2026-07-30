import { db } from '../../infra/database/postres.drizzle.js';
import { ProdutoDrizzleAdapter } from './infra/out/persistence/produto.drizzle-adapter.js';
import { ProdutoService } from './application/produto.service.js';

class ProdutoModule {
  service(): ProdutoService {
    const repository = new ProdutoDrizzleAdapter(db);
    return new ProdutoService(repository);
  }
}

export default new ProdutoModule();
