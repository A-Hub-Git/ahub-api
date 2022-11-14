"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.REDIS_PORT = exports.REDIS_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const REDIS_URL = process.env.REDIS_URL || 'redis';
exports.REDIS_URL = REDIS_URL;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
exports.REDIS_PORT = REDIS_PORT;
const JWT_SECRET = process.env.JWT_SECRET || 'ahub_secret';
exports.JWT_SECRET = JWT_SECRET;
//# sourceMappingURL=middleware.js.map