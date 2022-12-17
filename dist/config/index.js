"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zohoCrmConfig = exports.mailerConfig = exports.termiiConfig = exports.pubNubConfig = exports.sinchConfig = exports.JWT_SECRET = exports.redisConfig = exports.mongoConfig = void 0;
const mongo_1 = __importDefault(require("./mongo"));
exports.mongoConfig = mongo_1.default;
const sinch_1 = __importDefault(require("./sinch"));
exports.sinchConfig = sinch_1.default;
const pubnub_1 = __importDefault(require("./pubnub"));
exports.pubNubConfig = pubnub_1.default;
const termii_1 = __importDefault(require("./termii"));
exports.termiiConfig = termii_1.default;
const mail_1 = __importDefault(require("./mail"));
exports.mailerConfig = mail_1.default;
const redis_1 = require("./redis");
Object.defineProperty(exports, "redisConfig", { enumerable: true, get: function () { return redis_1.redisConfig; } });
const zoho_1 = __importDefault(require("./zoho"));
exports.zohoCrmConfig = zoho_1.default;
const middleware_1 = require("./middleware");
Object.defineProperty(exports, "JWT_SECRET", { enumerable: true, get: function () { return middleware_1.JWT_SECRET; } });
//# sourceMappingURL=index.js.map