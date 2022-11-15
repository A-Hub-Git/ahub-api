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
const ResponseCode_1 = require("./../Utils/ResponseCode");
const BaseRequestHandle_1 = __importDefault(require("../Server/BaseRequestHandle"));
const Services_1 = require("../Services");
const Libs_1 = require("../Libs");
class UserController {
    static createRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                Libs_1.Logger.info('Creating Role...');
                const roles = yield Services_1.UserService.getRoles();
                if (roles.length == 2) {
                    BaseRequestHandle_1.default.setError(ResponseCode_1.HTTP_CODES.BAD_REQUEST, 'Roles Exceeded');
                    Libs_1.Logger.info('Roles Exceeded');
                    return BaseRequestHandle_1.default.send(res);
                }
                const createdRole = yield Services_1.UserService.role(data);
                BaseRequestHandle_1.default.setSuccess(ResponseCode_1.HTTP_CODES.CREATED, 'Role created', createdRole);
                Libs_1.Logger.info('Role Created...');
                return BaseRequestHandle_1.default.send(res);
            }
            catch (error) {
                Libs_1.Logger.error('Error Creating Role...');
                BaseRequestHandle_1.default.setError(ResponseCode_1.HTTP_CODES.INTERNAL_SERVER_ERROR, ResponseCode_1.ResponseMessage.INTERNAL_SERVER_ERROR);
                return BaseRequestHandle_1.default.send(res);
            }
        });
    }
    static getRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield Services_1.UserService.getRoles();
                BaseRequestHandle_1.default.setSuccess(ResponseCode_1.HTTP_CODES.CREATED, 'Roles Received', roles);
                return BaseRequestHandle_1.default.send(res);
            }
            catch (error) {
                BaseRequestHandle_1.default.setError(ResponseCode_1.HTTP_CODES.INTERNAL_SERVER_ERROR, ResponseCode_1.ResponseMessage.INTERNAL_SERVER_ERROR);
                return BaseRequestHandle_1.default.send(res);
            }
        });
    }
    static fetchUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield Services_1.UserService.getUsers();
                if (!users) {
                    BaseRequestHandle_1.default.setSuccess(ResponseCode_1.HTTP_CODES.RESOURCE_NOT_FOUND, 'Users not received', users);
                    return BaseRequestHandle_1.default.send(res);
                }
                BaseRequestHandle_1.default.setSuccess(ResponseCode_1.HTTP_CODES.OK, 'users received', users);
                return BaseRequestHandle_1.default.send(res);
            }
            catch (error) {
                BaseRequestHandle_1.default.setError(ResponseCode_1.HTTP_CODES.INTERNAL_SERVER_ERROR, ResponseCode_1.ResponseMessage.INTERNAL_SERVER_ERROR);
                return BaseRequestHandle_1.default.send(res);
            }
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const user = data.role;
            try {
                const role = yield prisma_1.Prisma.role.findMany();
                Libs_1.Logger.info(`Creating ${data.role}...`);
                data.roleId = data.role === 'Patron' ? role[0].id : role[1].id;
                delete data.role;
                data.location = JSON.parse(data.location);
                data.password = yield Libs_1.Authorization.createHash(data.password);
                const createdUser = yield Services_1.UserService.create(data);
                Libs_1.Logger.info(`${user} Created Successfully😅`);
                BaseRequestHandle_1.default.setSuccess(ResponseCode_1.HTTP_CODES.CREATED, `${user} Created Successfully`, createdUser);
                BaseRequestHandle_1.default.send(res);
            }
            catch (error) {
                Libs_1.Logger.error(`Error creating ${user}  😠`);
                BaseRequestHandle_1.default.setError(ResponseCode_1.HTTP_CODES.INTERNAL_SERVER_ERROR, `${ResponseCode_1.ResponseMessage.INTERNAL_SERVER_ERROR + error}`);
                return BaseRequestHandle_1.default.send(res);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map