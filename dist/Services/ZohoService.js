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
const Libs_1 = require("../Libs");
const config_1 = require("../config");
const prisma_1 = require("../prisma");
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const Axios = axios_1.default.create();
function addMinutes() {
    let date = (0, moment_1.default)().add(55, 'minutes');
    return date;
}
class ZohoService {
    static generatingToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Libs_1.Logger.info('Generating Zoho Access Token');
                const { data } = yield Axios.post(`https://accounts.zoho.com/oauth/v2/token?client_id=${config_1.zohoCrmConfig.clientID}&client_secret=${config_1.zohoCrmConfig.clientSecret}&grant_type=authorization_code&code=1000.2ab2114b505a42df9d4defd801dfe1ef.f144e4af5d59428d50ea1e9fd430f54e`);
                console.log(data, 'from xoho');
                const token = yield this.saveToken({
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    expires_in: addMinutes().toString()
                });
                Libs_1.Logger.info(`Generated Zoho Access And Refresh Token`);
                data.token = token;
                return data;
            }
            catch (error) {
                Libs_1.Logger.error(`Error Generating Zoho Access And Refresh Token: ${JSON.stringify(error)}`);
                throw new Error('Error Generating Zoho Access And Refresh Token');
            }
        });
    }
    static fetchToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.Prisma.zohoToken.findUnique({
                where: { id: '639ca03111f43a1124787cb6' }
            });
        });
    }
    static saveToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.Prisma.zohoToken.create({ data });
        });
    }
    static destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield prisma_1.Prisma.zohoToken.delete({ where: { id } });
            return find;
        });
    }
    static refreshingAccessToken(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Libs_1.Logger.info('Refreshing Token');
                const { data } = yield Axios.post(`https://accounts.zoho.com/oauth/v2/token?client_id=${config_1.zohoCrmConfig.clientID}&client_secret=${config_1.zohoCrmConfig.clientSecret}&grant_type=refresh_token&refresh_token=${refresh_token}&scope=${config_1.zohoCrmConfig.scope}`);
                data.expires_in = addMinutes().toString();
                const updated = yield prisma_1.Prisma.zohoToken.update({
                    where: { id: '639ca03111f43a1124787cb6' },
                    data: {
                        access_token: data.access_token,
                        refresh_token: data.refresh_token,
                        expires_in: data.expires_in
                    }
                });
                Libs_1.Logger.info(`Generated Zoho Code: ${JSON.stringify(updated)}`);
                return updated;
            }
            catch (error) {
                Libs_1.Logger.error(`Error Generating Zoho Code: ${error}`);
                throw new Error('Error Generating Zoho Access And Refresh Token');
            }
        });
    }
    static createTicket(ticket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let zoho = yield this.fetchToken();
                console.log(zoho, 'co');
                const iso = (0, moment_1.default)(zoho === null || zoho === void 0 ? void 0 : zoho.expires_in, 'DD MM YYYY hh:mm:ss').format();
                if ((0, moment_1.default)().isAfter(iso)) {
                    zoho = yield this.refreshingAccessToken(zoho === null || zoho === void 0 ? void 0 : zoho.refresh_token);
                }
                Libs_1.Logger.info('Creating Zoho Ticket');
                const { data } = yield Axios.post('https://desk.zoho.com/api/v1/tickets', ticket, {
                    headers: {
                        Authorization: `Bearer ${zoho === null || zoho === void 0 ? void 0 : zoho.access_token}`
                    }
                });
                Libs_1.Logger.info('Created Zoho Ticket');
                return data;
            }
            catch (error) {
                Libs_1.Logger.error(`Error Creating Zoho Ticket: ${JSON.stringify(error)}`);
                throw new Error('Error Creating Zoho Ticket');
            }
        });
    }
}
exports.default = ZohoService;
//# sourceMappingURL=ZohoService.js.map