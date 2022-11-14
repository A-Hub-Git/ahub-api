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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserService {
    static role(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.role.create({ data });
        });
    }
    static getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.role.findMany();
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.create({ data });
        });
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findMany();
        });
    }
    static getById() {
        return __awaiter(this, void 0, void 0, function* () {
            //return await prisma.user.findOne();
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map