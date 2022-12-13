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
const nodemailer = require('nodemailer');
const prisma_1 = require("../prisma");
const Authorization_1 = __importDefault(require("../Authorization/Authorization"));
const Libs_1 = require("../Libs");
const String_1 = __importDefault(require("../Utils/String"));
const config_1 = require("../config");
class SMSService {
    constructor() {
        this.httpService = axios_1.default.create({
            baseURL: config_1.termiiConfig.baseUrl
        });
    }
    sendOtp(recipients, message, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const _recipients = Array.isArray(recipients) ? recipients : [recipients];
            const to = this._prunRecipients(_recipients);
            const otp = message + ': ' + (yield this.generateOtp(userId));
            return this.send(to, otp);
        });
    }
    send(to, sms, channel = 'dnd') {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this._loadData({ to, sms, channel });
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.httpService.post('/sms/send', data);
                    console.log('sms sent');
                    resolve(response.data);
                }
                catch (error) {
                    Libs_1.Logger.error(`SMS Error: ${JSON.stringify(error)}`);
                    reject(error);
                }
            }));
        });
    }
    _loadData(extra = {}) {
        const { from, api_key } = this._loadConfig();
        return Object.assign({ type: 'plain', channel: 'dnd', from,
            api_key }, extra);
    }
    _loadConfig() {
        return config_1.termiiConfig;
    }
    _prunRecipients(recipients) {
        return Array.isArray(recipients)
            ? recipients.map(phone => phone.replace(/[^0-9]/g, ''))
            : recipients;
    }
    generateOtp(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const expires_at = (0, moment_1.default)().add(10, 'm').toDate();
                const otp = String_1.default.otp();
                const token = Authorization_1.default.createHash(otp);
                try {
                    const exist = yield prisma_1.Prisma.verificationToken.findFirst({
                        where: { userId }
                    });
                    if (!exist) {
                        yield prisma_1.Prisma.verificationToken.create({
                            data: {
                                token,
                                userId,
                                expires_at
                            }
                        });
                        return resolve(otp);
                    }
                    yield prisma_1.Prisma.verificationToken.update({
                        where: { id: exist.id },
                        data: {
                            expires_at,
                            token
                        }
                    });
                    return resolve(otp);
                }
                catch (error) {
                    Libs_1.Logger.error(`Error generating OTP: ${JSON.stringify(error)}`);
                    return reject(error);
                }
            }));
        });
    }
    verifyOtp(userId, token) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const isOtp = yield prisma_1.Prisma.verificationToken.findFirst({
                where: { userId }
            });
            try {
                if (isOtp &&
                    Authorization_1.default.compareHash(token, isOtp.token) &&
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
}
exports.default = new SMSService();
//# sourceMappingURL=SMSService.js.map