"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prisma = void 0;
const client_1 = require("@prisma/client");
const Libs_1 = require("../Libs");
const Prisma = new client_1.PrismaClient();
exports.Prisma = Prisma;
Prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    const before = Date.now();
    const result = yield next(params);
    const after = Date.now();
    Libs_1.Logger.info(`Query ${params.model}.${params.action} took ${after - before}ms`);
    return result;
}));
//# sourceMappingURL=index.js.map