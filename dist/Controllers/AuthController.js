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
const BaseRequestHandle_1 = __importDefault(require("../Utils/BaseRequestHandle"));
const AuthService_1 = __importDefault(require("../Services/AuthService"));
const Authorization_1 = __importDefault(require("../Authorization/Authorization"));
const Libs_1 = require("../Libs");
const AuthValidator_1 = __importDefault(require("../Validators/AuthValidator"));
const Utils_1 = require("../Utils");
const CommunicationService_1 = __importDefault(require("../Services/CommunicationService"));
class AuthController extends CommunicationService_1.default {
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
                    yield AuthService_1.default.login(user, password.trim());
                    yield Authorization_1.default.cookieToken(user, res);
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
    static resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield AuthValidator_1.default.resendOtp(req.params.user_id, res, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield prisma_1.Prisma.user.findFirst({
                        where: { id: req.params.user_id }
                    });
                    yield CommunicationService_1.default.sendSms(user === null || user === void 0 ? void 0 : user.phone, user === null || user === void 0 ? void 0 : user.id);
                    BaseRequestHandle_1.default.setSuccess(Utils_1.HTTP_CODES.CREATED, 'otp sent');
                    return BaseRequestHandle_1.default.send(res);
                }
                catch (error) {
                    BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.INTERNAL_SERVER_ERROR, `Internal Server Error. Contact Support.. : ${error}`);
                    return BaseRequestHandle_1.default.send(res);
                }
            }));
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map