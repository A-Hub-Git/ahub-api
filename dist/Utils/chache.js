"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EXPIRATION_TIME = 3600;
const Cache = (key, cb) => {
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
exports.default = Cache;
//# sourceMappingURL=chache.js.map