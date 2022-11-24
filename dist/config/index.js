"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sinchConfig = exports.JWT_SECRET = exports.redisConfig = exports.mongoConfig = void 0;
const mongo_1 = __importDefault(require("./mongo"));
exports.mongoConfig = mongo_1.default;
const sinch_1 = __importDefault(require("./sinch"));
exports.sinchConfig = sinch_1.default;
const redis_1 = require("./redis");
Object.defineProperty(exports, "redisConfig", { enumerable: true, get: function () { return redis_1.redisConfig; } });
const middleware_1 = require("./middleware");
Object.defineProperty(exports, "JWT_SECRET", { enumerable: true, get: function () { return middleware_1.JWT_SECRET; } });
//# sourceMappingURL=index.js.map