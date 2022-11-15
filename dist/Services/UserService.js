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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chache_1 = __importDefault(require("../Utils/chache"));
const Libs_1 = require("../Libs");
const redis_1 = __importDefault(require("../Libs/redis"));
const prisma_1 = require("../prisma");
class UserService {
    static role(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.Prisma.role.create({ data });
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.Prisma.user.create({ data });
        });
    }
    static getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield (0, chache_1.default)('roles', () => __awaiter(this, void 0, void 0, function* () {
                    const data = yield prisma_1.Prisma.role.findMany();
                    return data;
                }));
                return roles;
            }
            catch (error) {
                Libs_1.Logger.error(`Error fetching role (REDIS..): ${error}`);
            }
        });
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const cachedUsers = yield redis_1.default.get('users');
            if (cachedUsers) {
                return JSON.parse(cachedUsers);
            }
            const dbUsers = yield prisma_1.Prisma.user.findMany();
            redis_1.default.setEx('users', 3600, JSON.stringify(dbUsers));
            return dbUsers;
        });
    }
    static getByUnique() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.Prisma.user.findUnique({ where: {} });
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map