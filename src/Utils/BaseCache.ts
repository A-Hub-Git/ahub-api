import {Logger, RedisClient} from '../Libs';

class BaseCache {
  private EXPIRATION_TIME = 3600;

  baseCache(key: string, cb: () => any) {
    return new Promise(async (resolve, reject) => {
      try {
        await RedisClient.get(key).then(async data => {
          if (data) {
            Logger.info('CACHE HITS');
            return resolve(JSON.parse(data));
          }
          Logger.info('CACHE MISS');
          const fresh_data = await cb();
          RedisClient.setEx(
            key,
            this.EXPIRATION_TIME,
            JSON.stringify(fresh_data)
          );
          resolve(fresh_data);
        });
      } catch (error) {
        Logger.error(`Cache Error: ${error}`);
        reject(error);
      }
    });
  }
}

export default new BaseCache().baseCache;
