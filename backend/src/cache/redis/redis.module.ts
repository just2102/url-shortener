import { Module } from '@nestjs/common';
import { createClient } from '@redis/client';

export const REDIS_CLIENT = 'REDIS_CLIENT';

/**
 * Usage example in a service/controller:
 * @Inject(REDIS_CLIENT) private redisClient: RedisClientType,
 */
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async () => {
        return await createRedisClient();
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}

export const createRedisClient = async () => {
  const client = createClient({
    url: process.env.REDIS_CONNECTION_STRING,
  });

  client.on('connect', () => {
    console.log('Connected to Redis');
  });

  client.on('error', (err) => {
    console.log(err.message);
  });

  client.on('ready', () => {
    console.log('Redis is ready');
  });

  client.on('reconnecting', () => {
    console.log('client is reconnecting');
  });

  client.on('end', () => {
    console.log('Redis connection ended');
  });

  await client.connect();
  return client;
};
