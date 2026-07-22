import { redisClient } from '@/infra/redis/redis.js';
import { Departamento, type DepartamentoDTO } from '../../domain/departamento.domain.js';

export class DepartamentoCache {
  async salvar(dpto: Departamento[] | Departamento): Promise<void> {
    if (dpto instanceof Departamento) {
      await redisClient.set(`departamento:${dpto.id}`, JSON.stringify(dpto));
    } else {
      await redisClient.set(`departamento`, JSON.stringify(dpto));
    }
  }

  async obter(): Promise<Departamento[]> {
    let dptos = await redisClient.get('departamento');
    if (dptos) {
      const listaDpto: DepartamentoDTO[] = JSON.parse(dptos);
      return listaDpto.map((d) => Departamento.hidratar(d));
    }

    return [];
  }

  async obterPeloId(id: number): Promise<Departamento | null> {
    const dpto = await redisClient.get(`departamento:${id}`);
    if (dpto) {
      Departamento.hidratar(JSON.parse(dpto));
      console.log(`cache hit = departamento:${id}`);
    }
    return null;
  }
}
