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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Enum_1 = require("../Utils/Enum");
const prisma_1 = require("../prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../config");
const BaseRequestHandle_1 = __importDefault(require("../Utils/BaseRequestHandle"));
dotenv_1.default.config();
class Authorization {
    static cookieToken(user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getJwtToken(user);
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            user.password = '';
            user.token = token;
            res.status(200).cookie('token', token, options).json({
                message: 'Login Successful.',
                data: user
            });
        });
    }
    static getJwtToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({ user }, config_1.JWT_SECRET, { expiresIn: '1 day' });
        });
    }
    static createHash(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.hashSync(hash, 10);
        });
    }
    static compareHash(value, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.hashSync(value, hash);
        });
    }
}
exports.default = Authorization;
_a = Authorization;
Authorization.VerifyUserToken = (roleIds) => (req, res, next) => {
    var _b;
    try {
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (error, payload) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.UNAUTHORIZED, 'Unauthorized. Token Invalid');
                return BaseRequestHandle_1.default.send(res);
            }
            const user = yield prisma_1.Prisma.user.findUnique({
                where: { id: payload.userId }
            });
            if (!user) {
                BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.UNAUTHORIZED, 'Unauthorized. User does not exist in our system');
                return BaseRequestHandle_1.default.send(res);
            }
            if (user &&
                roleIds &&
                roleIds.length &&
                !roleIds.includes(user.roleId)) {
                BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.BAD_REQUEST, 'Access Denied, Unauthorized Access');
                return BaseRequestHandle_1.default.send(res);
            }
            req.user = user;
        }));
    }
    catch (error) {
        BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.UNAUTHORIZED, 'Unauthorized. Token Invalid');
        return BaseRequestHandle_1.default.send(res);
    }
};
//# sourceMappingURL=Authorization.js.map