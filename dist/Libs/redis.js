"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const config_1 = require("../config");
const Logger_1 = __importDefault(require("./Logger"));
const RedisClient = (0, redis_1.createClient)({
    url: `redis://default:${config_1.REDIS_PASSWORD}@${config_1.REDIS_URL}`
});
RedisClient.on('error', err => Logger_1.default.error(`Error connection to redis: ${err}`));
exports.default = RedisClient;
//# sourceMappingURL=redis.js.map