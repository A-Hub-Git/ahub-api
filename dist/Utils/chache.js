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
const EXPIRATION_TIME = 3600;
const Cache = (key, cb) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        yield Libs_1.Redis.get(key).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data) {
                Libs_1.Logger.info('CACHE HITS');
                return resolve(JSON.parse(data));
            }
            Libs_1.Logger.info('CACHE MISS');
            const fresh_data = yield cb();
            Libs_1.Redis.setEx(key, EXPIRATION_TIME, JSON.stringify(fresh_data));
            resolve(fresh_data);
        }));
    }));
};
exports.default = Cache;
//# sourceMappingURL=chache.js.map