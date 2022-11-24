import {createClient} from 'redis';
import {redisConfig} from '../config';
import Logger from './Logger';

const RedisClient = createClient({
  url: `redis://${redisConfig.REDIS_USERNAME}:${redisConfig.REDIS_PASSWORD}@${redisConfig.REDIS_URL}:${redisConfig.REDIS_PORT}`
});
RedisClient.on('error', err =>
  Logger.error(`Error connection to redis: ${err}`)
);
export default RedisClient;
