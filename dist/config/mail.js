"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    host: process.env.MAIL_HOST || '',
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USERNAME || '',
    pass: process.env.MAIL_PASSWORD || '',
    from: process.env.MAIL_SENDER || ''
};
//# sourceMappingURL=mail.js.map