import {Logger, RedisClient} from '../Libs';
const EXPIRATION_TIME = 3600;
const Cache = (key: string, cb: () => any) => {
  // return new Promise(async (resolve, reject) => {
  //   await Redis.get(key).then(async data => {
  //     if (data) {
  //       Logger.info('CACHE HITS');
  //       return resolve(JSON.parse(data));
  //     }
  //     Logger.info('CACHE MISS');
  //     const fresh_data = await cb();
  //     Redis.setEx(key, EXPIRATION_TIME, JSON.stringify(fresh_data));
  //     resolve(fresh_data);
  //   });
  // });
};

export default Cache;
