import {createClient} from 'redis';
import {REDIS_URL, REDIS_PASSWORD} from '../config';
import Logger from './Logger';

const RedisClient = createClient();
RedisClient.on('error', err =>
  Logger.error(`Error connection to redis: ${err}`)
);
export default RedisClient;
