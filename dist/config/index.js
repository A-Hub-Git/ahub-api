"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_URL = exports.JWT_SECRET = exports.REDIS_PORT = exports.mongoConfig = void 0;
const mongo_1 = __importDefault(require("./mongo"));
exports.mongoConfig = mongo_1.default;
const middleware_1 = require("./middleware");
Object.defineProperty(exports, "REDIS_PORT", { enumerable: true, get: function () { return middleware_1.REDIS_PORT; } });
Object.defineProperty(exports, "REDIS_URL", { enumerable: true, get: function () { return middleware_1.REDIS_URL; } });
Object.defineProperty(exports, "JWT_SECRET", { enumerable: true, get: function () { return middleware_1.JWT_SECRET; } });
//# sourceMappingURL=index.js.map