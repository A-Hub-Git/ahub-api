"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisConfig = {
    REDIS_URL: process.env.REDIS_URL || 'redis',
    REDIS_USERNAME: process.env.REDIS_USERNAME || 'ahub_jibril',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || ''
};
exports.redisConfig = redisConfig;
//# sourceMappingURL=redis.js.map