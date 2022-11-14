"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient({
    errorFormat: 'pretty',
    log: [
        {
            emit: 'event',
            level: 'query'
        },
        {
            emit: 'stdout',
            level: 'error'
        },
        {
            emit: 'stdout',
            level: 'info'
        },
        {
            emit: 'stdout',
            level: 'warn'
        }
    ]
});
exports.default = Prisma;
//# sourceMappingURL=index.js.map