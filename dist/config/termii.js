"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    baseUrl: process.env.TERMII_BASE_URL,
    from: process.env.TERMII_SMS_FROM,
    api_key: process.env.TERMII_API_KEY,
    api_secret: process.env.TERMII_API_SECRET
};
//# sourceMappingURL=termii.js.map