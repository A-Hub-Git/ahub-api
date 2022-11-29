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
const moment_1 = __importDefault(require("moment"));
const axios_1 = __importDefault(require("axios"));
const prisma_1 = require("../prisma");
const Authorization_1 = __importDefault(require("../Authorization/Authorization"));
const Libs_1 = require("../Libs");
const config_1 = require("../config");
class CommunicationService extends Authorization_1.default {
    static generateOtp(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const expires_at = (0, moment_1.default)().add(10, 'm').toDate();
                const token = this.createHash('1234');
                try {
                    const exist = yield prisma_1.Prisma.verificationToken.findFirst({
                        where: { userId }
                    });
                    if (!exist) {
                        const created = yield prisma_1.Prisma.verificationToken.create({
                            data: {
                                token,
                                userId,
                                expires_at
                            }
                        });
                        return resolve(created);
                    }
                    const updated = yield prisma_1.Prisma.verificationToken.update({
                        where: { id: exist.id },
                        data: {
                            expires_at,
                            token
                        }
                    });
                    return resolve(updated);
                }
                catch (error) {
                    Libs_1.Logger.error(`Error generating OTP: ${JSON.stringify(error)}`);
                    return reject(error);
                }
            }));
        });
    }
    static verifyOtp(userId, token) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const isOtp = yield prisma_1.Prisma.verificationToken.findFirst({
                where: { userId }
            });
            try {
                if (isOtp &&
                    this.compareHash(token, isOtp.token) &&
                    (0, moment_1.default)().isBefore(isOtp.expires_at)) {
                    return resolve(true);
                }
                return resolve(false);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    static sendSms(phone_number, userId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(`${config_1.sinchConfig.SINCH_BASE_URL}/v1/${config_1.sinchConfig.SINCH_SERVICE_PLAN_ID}/batches`, {
                    from: config_1.sinchConfig.SINCH_SINCH_NUMBER,
                    to: [`${phone_number}`],
                    body: `your OTP ${this.generateOtp(userId)}`
                }, {
                    headers: {
                        Authorization: `Bearer ${config_1.sinchConfig.SINCH_API_TOKEN}`
                    }
                });
                Libs_1.Logger.info('OPT sent');
                resolve(response.data);
            }
            catch (error) {
                Libs_1.Logger.error(`OTP Error`);
                reject(error);
            }
        }));
    }
}
exports.default = CommunicationService;
//# sourceMappingURL=CommunicationService.js.map