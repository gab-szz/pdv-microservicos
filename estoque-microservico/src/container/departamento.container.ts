import { db } from '@/infra/database/postres.drizzle.js';
import { redisClient } from '@/infra/redis/redis.js';
import { DepartamentoService } from '@/modules/departamento/application/departamento.service.js';
import { DepartamentoCache } from '@/modules/departamento/infra/out/cache/departamento.redis.js';
import { DepartamentoIA } from '@/modules/departamento/infra/out/ia/departamento.ia.js';
import { DepartamentoDrizzleAdapter } from '@/modules/departamento/infra/out/persistence/departamento.drizzle-adapter.js';
import { asValue, asClass, type AwilixContainer } from 'awilix';

export function registrarDepartamento(container: AwilixContainer<{}>) {
  container.register({
    db: asValue(db),
    ioredis: asValue(redisClient),
    departamentoRepository: asClass(DepartamentoDrizzleAdapter).singleton(),
    departamentoService: asClass(DepartamentoService).singleton(),
    departamentoCache: asClass(DepartamentoCache).singleton(),
    departamentoIA: asClass(DepartamentoIA).singleton(),
  });
}
