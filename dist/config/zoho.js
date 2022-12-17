"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    clientID: process.env.ZOHO_CLIENT_ID,
    clientSecret: process.env.ZOHO_CLIENT_SECRET,
    code: process.env.ZOHO_CODE,
    scope: 'Desk.tickets.ALL'
};
//# sourceMappingURL=zoho.js.map