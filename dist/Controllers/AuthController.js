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
const prisma_1 = require("../prisma");
const BaseRequestHandle_1 = __importDefault(require("../Server/BaseRequestHandle"));
const AuthService_1 = __importDefault(require("../Services/AuthService"));
const Libs_1 = require("../Libs");
const AuthValidator_1 = __importDefault(require("../Validators/AuthValidator"));
const Constant_1 = __importDefault(require("../Constant"));
class AuthController extends Constant_1.default {
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            yield AuthValidator_1.default.login(req.body, res, () => __awaiter(this, void 0, void 0, function* () {
                //await Cache('sign in', async () => {
                try {
                    Libs_1.Logger.info('Signing In.....');
                    const user = yield prisma_1.Prisma.user.findUnique({
                        where: { email }
                    });
                    const data = yield AuthService_1.default.login(user, password.trim());
                    BaseRequestHandle_1.default.setSuccess(200, 'Login Successfully...', data);
                    return BaseRequestHandle_1.default.send(res);
                }
                catch (error) {
                    Libs_1.Logger.error(`Login failed. Please try again later.: ${error}`);
                    const message = error.status == 401
                        ? error.message
                        : 'Login failed. Please try again later.';
                    BaseRequestHandle_1.default.setError(401, message);
                    return BaseRequestHandle_1.default.send(res);
                }
            }));
            // });
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map