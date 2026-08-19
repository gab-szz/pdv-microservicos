import { redisClient } from '@/infra/redis/redis.js';
import { Departamento } from '../../../domain/departamento.domain.js';
import {
  DepartamentoRedisMapper,
  type DepartamentoJsonDTO,
} from './departamento.mapper.js';

export class DepartamentoCache {
  private readonly ioredis: typeof redisClient;

  constructor({ ioredis }: { ioredis: typeof redisClient }) {
    this.ioredis = ioredis;
  }

  async salvar(input: Departamento[] | Departamento): Promise<void> {
    if (input instanceof Departamento) {
      const json = DepartamentoRedisMapper.departamentoParaJson(input);

      await this.ioredis.set(`departamento:${input.id}`, JSON.stringify(json));
    } else {
      const json = input.map((d) =>
        DepartamentoRedisMapper.departamentoParaJson(d),
      );
      await this.ioredis.set(`departamento`, JSON.stringify(json));
    }
  }

  async obter(): Promise<Departamento[]> {
    let departamentos = await this.ioredis.get('departamento');
    if (departamentos) {
      const listaDpto: DepartamentoJsonDTO[] = JSON.parse(departamentos);
      return listaDpto.map((d) =>
        DepartamentoRedisMapper.jsonParaDepartamento(d),
      );
    }

    return [];
  }

  async obterPeloId(id: number): Promise<Departamento | null> {
    const json = await this.ioredis.get(`departamento:${id}`);
    if (json) {
      const departamento = DepartamentoRedisMapper.jsonParaDepartamento(
        JSON.parse(json),
      );
      console.log(`cache hit = departamento:${id}`);
      return departamento;
    }
    return null;
  }
}
