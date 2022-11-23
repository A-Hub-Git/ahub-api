"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Libs_1 = require("../Libs");
class BaseCache {
    constructor() {
        this.EXPIRATION_TIME = 3600;
    }
    static baseCache(key, cb) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield Libs_1.RedisClient.get(key).then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        Libs_1.Logger.info('CACHE HITS');
                        return resolve(JSON.parse(data));
                    }
                    const fresh_data = yield cb();
                    Libs_1.RedisClient.setEx(key, 3600, JSON.stringify(fresh_data));
                    resolve(fresh_data);
                    Libs_1.Logger.info('CACHE MISS');
                    return;
                }));
            }
            catch (error) {
                Libs_1.Logger.error(`Cache Error: ${error}`);
                reject(error);
            }
        }));
    }
}
exports.default = BaseCache;
//# sourceMappingURL=BaseCache.js.map