import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisClient } from './redis.service';
import { SharedDITokens } from '@protaskify/shared/di/SharedDITokens';
import { ServerConfig } from '@protaskify/shared/infrastructure/config/ServerConfig';

const CACHE_TTL_IN_MILLISECONDS = 600000; // 10minutes

const redisInstance = CacheModule.register<RedisClientOptions>({
  name: SharedDITokens.RedisCacheModule.toString(),
  store: redisStore,
  ttl: CACHE_TTL_IN_MILLISECONDS,
  socket: {
    host: ServerConfig.REDIS_HOST,
    port: ServerConfig.REDIS_PORT,
  },
});

@Module({
  imports: [redisInstance],
  exports: [RedisClient],
  providers: [RedisClient],
})
export class RedisCacheModule {}
