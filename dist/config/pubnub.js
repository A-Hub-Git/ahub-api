"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pubNubConfig = {
    PUBLISH_KEY: process.env.PUBLISH_KEY,
    SUBSCRIBE_KEY: process.env.SUBSCRIBE_KEY
};
exports.default = pubNubConfig;
//# sourceMappingURL=pubnub.js.map