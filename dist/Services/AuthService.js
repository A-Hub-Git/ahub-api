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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const moment_1 = __importDefault(require("moment"));
const prisma_1 = require("../prisma");
const Authorization_1 = __importDefault(require("../Authorization/Authorization"));
const UserService_1 = __importDefault(require("./UserService"));
const CommunicationService_1 = __importDefault(require("./CommunicationService"));
class AuthService extends Authorization_1.default {
    static login(data, _password) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = new Error();
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        const { password } = data, user = __rest(data, ["password"]);
                        if (bcryptjs_1.default.compareSync(_password, password)) {
                            user.password = '';
                            const token = yield Authorization_1.default.getJwtToken(user);
                            return resolve({ user, token });
                        }
                        error.status = 401;
                        error.message = 'Invalid login credentials';
                        return reject(error);
                    }
                    else {
                        error.status = 401;
                        error.message = 'Invalid login credentials';
                        return reject(error);
                    }
                });
            });
        });
    }
    static forgetPassword({ id: userId, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const expires_at = (0, moment_1.default)().add(10, 'm').toDate();
                const token = this.createHash('1234');
                try {
                    const isPasswordToken = yield this.findPasswordToken(userId);
                    if (!isPasswordToken) {
                        yield CommunicationService_1.default.sendSms(phone, userId);
                        const created = yield this.createPasswordToken({
                            token,
                            userId,
                            expires_at
                        });
                        return resolve(created);
                    }
                    yield CommunicationService_1.default.sendSms(phone, userId);
                    return resolve(yield this.updatePasswordToken(userId, {
                        expires_at,
                        token
                    }));
                }
                catch (error) {
                    return reject(error);
                }
            }));
        });
    }
    static verifyResetPassword(userId, token) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findPasswordToken(userId);
            try {
                if (user &&
                    this.compareHash(token, user.token) &&
                    (0, moment_1.default)().isBefore(user.expires_at)) {
                    const verified = yield this.updatePasswordToken(userId, {
                        isVerified: true
                    });
                    verified.token = '';
                    return resolve(verified);
                }
                return resolve(false);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    static confirmResetPassword(id, newPassword) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const password = this.createHash(newPassword);
                yield UserService_1.default.update({ id }, { password });
                yield this.updatePasswordToken(id, {
                    isVerified: false
                });
                return resolve(true);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    static createPasswordToken(data) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const password_token = yield prisma_1.Prisma.passwordResetToken.create({ data });
                password_token.token = '';
                return resolve(password_token);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    static updatePasswordToken(userId, data) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.findPasswordToken(userId);
                const password_token = yield prisma_1.Prisma.passwordResetToken.update({
                    where: { id: token.id },
                    data
                });
                return resolve(password_token);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    static findPasswordToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const password_token = yield prisma_1.Prisma.passwordResetToken.findFirst({
                        where: { userId }
                    });
                    return resolve(password_token);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    static updatePassword(data, newPassword) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserService_1.default.update({ data }, {
                    password: newPassword
                });
                if (user)
                    return resolve(user);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map