import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RedisClient {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getOne<T>(key: string): Promise<T> {
    const entity = await this.cacheManager.get<string>(key);
    return entity ? JSON.parse(entity) : undefined;
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.cacheManager.set(key, JSON.stringify(value));
  }
}
