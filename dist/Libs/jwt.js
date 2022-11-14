"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const getJwtToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, config_1.JWT_SECRET, { expiresIn: '1 day' });
};
exports.default = getJwtToken;
//# sourceMappingURL=jwt.js.map