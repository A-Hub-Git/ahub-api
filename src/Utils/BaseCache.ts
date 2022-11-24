import {Logger, RedisClient} from '../Libs';

class BaseCache {
  private EXPIRATION_TIME = 3600;

  static baseCache(key: string, cb: () => any) {
    return new Promise(async (resolve, reject) => {
      try {
        await RedisClient.get(key).then(async data => {
          if (data) {
            Logger.info('CACHE HITS');
            return resolve(JSON.parse(data));
          }
          const fresh_data = await cb();
          RedisClient.setEx(key, 3600, JSON.stringify(fresh_data));
          resolve(fresh_data);
          Logger.info('CACHE MISS');
          return;
        });
      } catch (error) {
        Logger.error(`Cache ${error}`);
        reject(error);
      }
    });
  }
}

export default BaseCache;
