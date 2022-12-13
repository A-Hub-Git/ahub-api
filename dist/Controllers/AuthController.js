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
const moment_1 = __importDefault(require("moment"));
const Libs_1 = require("../Libs");
const AuthValidator_1 = __importDefault(require("../Validators/AuthValidator"));
const Utils_1 = require("../Utils");
const Services_1 = require("../Services");
const Services_2 = require("../Services");
const Validators_1 = require("../Validators");
const QueueService_1 = __importDefault(require("../Services/QueueService"));
class AuthController {
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            yield AuthValidator_1.default.login(req.body, res, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    //const data = await Cache.baseCache('login', async () => {
                    Libs_1.Logger.info('Signing In.....');
                    const user = yield prisma_1.Prisma.user.findUnique({
                        where: { email }
                    });
                    const data = yield AuthService_1.default.login(user, password.trim());
                    BaseRequestHandle_1.default.setSuccess(Utils_1.HTTP_CODES.CREATED, 'Login Successful.', data);
                    return BaseRequestHandle_1.default.send(res);
                    //});
                    //return await Authorization.cookieToken(data, res);
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
        });
    }
    static resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.Prisma.user.findFirst({
                    where: { id: req.user.id }
                });
                yield QueueService_1.default.sendOTP(user === null || user === void 0 ? void 0 : user.phone, 'Enter this OTP to verify your account', user === null || user === void 0 ? void 0 : user.id);
                BaseRequestHandle_1.default.setSuccess(Utils_1.HTTP_CODES.CREATED, 'otp sent');
                return BaseRequestHandle_1.default.send(res);
            }
            catch (error) {
                BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.INTERNAL_SERVER_ERROR, `Internal Server Error. Contact Support.. : ${error}`);
                return BaseRequestHandle_1.default.send(res);
            }
        });
    }
    static verify_otp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = Number(req.params.otp);
            const user = req.user;
            yield AuthValidator_1.default.verifyOtp(req.params, res, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const valid = yield Services_1.SMSService.verifyOtp(user.id, `${otp}`);
                    if (!valid) {
                        BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.BAD_REQUEST, 'Invalid or wrong otp.');
                        return BaseRequestHandle_1.default.send(res);
                    }
                    BaseRequestHandle_1.default.setSuccess(Utils_1.HTTP_CODES.CREATED, 'OTP Verified');
                    return BaseRequestHandle_1.default.send(res);
                }
                catch (error) {
                    BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.INTERNAL_SERVER_ERROR, `Internal Server Error. Contact Support.. : ${error}`);
                    return BaseRequestHandle_1.default.send(res);
                }
            }));
        });
    }
    static updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { new_password, old_password } = req.body;
            yield AuthValidator_1.default.updatePassword(req.body, res, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield Services_2.UserService.updatePassword(req.user, old_password, new_password);
                    BaseRequestHandle_1.default.setSuccess(Utils_1.HTTP_CODES.CREATED, 'Password Updated Successfully');
                    return BaseRequestHandle_1.default.send(res);
                }
                catch (error) {
                    BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.BAD_REQUEST, `Invalid or Wrong Old Password`);
                    return BaseRequestHandle_1.default.send(res);
                }
            }));
        });
    }
    static forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Validators_1.UserValidator.emailOrPhone(req.body, res, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield Services_2.UserService.getByUnique(Object.assign({}, req.body));
                    if (user) {
                        const token = yield AuthService_1.default.forgetPassword(user);
                        token.token = '';
                        BaseRequestHandle_1.default.setSuccess(Utils_1.HTTP_CODES.CREATED, 'An OTP Has Been Sent to Your Registered Phone Number', token);
                        return BaseRequestHandle_1.default.send(res);
                    }
                    BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.RESOURCE_NOT_FOUND, 'User Not Found');
                    return BaseRequestHandle_1.default.send(res);
                }
                catch (error) {
                    BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.INTERNAL_SERVER_ERROR, `Internal Server Error. Contact Support.. : ${error}`);
                    return BaseRequestHandle_1.default.send(res);
                }
            }));
        });
    }
    static verifyResetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, otp } = req.body;
            try {
                const verify = yield AuthService_1.default.verifyResetPassword(user_id, otp);
                if (!verify) {
                    BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.BAD_REQUEST, 'Invalid or Wrong OTP');
                    return BaseRequestHandle_1.default.send(res);
                }
                BaseRequestHandle_1.default.setSuccess(Utils_1.HTTP_CODES.CREATED, 'OTP Verified');
                return BaseRequestHandle_1.default.send(res);
            }
            catch (error) {
                BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.INTERNAL_SERVER_ERROR, `Internal Server Error. Contact Support.. : ${error}`);
                return BaseRequestHandle_1.default.send(res);
            }
        });
    }
    static confirmResetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, new_password } = req.body;
            try {
                const [user, token] = yield Promise.all([
                    AuthService_1.default.confirmResetPassword(user_id, new_password),
                    AuthService_1.default.findPasswordToken(user_id)
                ]);
                if (!token.isVerified && (0, moment_1.default)().isAfter(token.expires_at)) {
                    BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.BAD_REQUEST, 'Invalid OTP');
                    return BaseRequestHandle_1.default.send(res);
                }
                if (!user) {
                    BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.BAD_REQUEST, 'User Not Found');
                    return BaseRequestHandle_1.default.send(res);
                }
                BaseRequestHandle_1.default.setSuccess(Utils_1.HTTP_CODES.CREATED, 'Password Updated Successfully');
                return BaseRequestHandle_1.default.send(res);
            }
            catch (error) {
                BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.INTERNAL_SERVER_ERROR, `Internal Server Error. Contact Support.. : ${error}`);
                return BaseRequestHandle_1.default.send(res);
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map