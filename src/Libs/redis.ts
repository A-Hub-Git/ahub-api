import {createClient} from 'redis';
import {REDIS_URL, REDIS_PASSWORD} from '../config';
import Logger from './Logger';

const Redis = createClient({
  url: `redis://default:${REDIS_PASSWORD}@${REDIS_URL}`
});
Redis.on('error', err => Logger.error(`Error connection to redis: ${err}`));
export default Redis;
