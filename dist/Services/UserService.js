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
const BaseCache_1 = __importDefault(require("../Utils/BaseCache"));
const Libs_1 = require("../Libs");
const prisma_1 = require("../prisma");
const CommunicationService_1 = __importDefault(require("./CommunicationService"));
const Authorization_1 = __importDefault(require("../Authorization/Authorization"));
class UserService extends CommunicationService_1.default {
    static role(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield prisma_1.Prisma.role.findMany();
            data.roleId = role.length + 1;
            return yield prisma_1.Prisma.role.create({ data });
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.Prisma.user.create({ data });
            const sms = yield this.sendSms(user.phone, user.id);
            return { user, sms };
        });
    }
    static getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const roles = await Cache('roles', async () => {
                const data = yield prisma_1.Prisma.role.findMany();
                return data;
                // });
                // return roles as any;
            }
            catch (error) {
                Libs_1.Logger.error(`Error fetching role (REDIS..): ${error}`);
            }
        });
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield BaseCache_1.default.baseCache('users', () => __awaiter(this, void 0, void 0, function* () {
                const fresh_users = yield prisma_1.Prisma.user.findMany();
                return fresh_users;
            }));
            return users;
        });
    }
    static getByUnique(clause) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let where = Object.assign({}, clause);
                    const user = yield prisma_1.Prisma.user.findUnique({ where });
                    return resolve(user);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    static update(clause, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let where = Object.assign({}, clause);
                    const user = yield prisma_1.Prisma.user.update({
                        where,
                        data
                    });
                    return resolve(user);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    static updatePassword(user, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    const isOldPassword = Authorization_1.default.compareHash(oldPassword, user.password);
                    if (!isOldPassword)
                        return reject(false);
                    const password = Authorization_1.default.createHash(newPassword);
                    const updatedPassword = prisma_1.Prisma.user.update({
                        where: { id: user.id },
                        data: { password }
                    });
                    return resolve(updatedPassword);
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map