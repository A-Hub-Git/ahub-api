"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sinchConfig = {
    SINCH_SERVICE_PLAN_ID: process.env.SINCH_SERVICE_PLAN_ID,
    SINCH_BASE_URL: process.env.SINCH_BASE_URL,
    SINCH_API_TOKEN: process.env.SINCH_API_TOKEN,
    SINCH_SINCH_NUMBER: process.env.SINCH_SINCH_NUMBER
};
exports.default = sinchConfig;
//# sourceMappingURL=sinch.js.map