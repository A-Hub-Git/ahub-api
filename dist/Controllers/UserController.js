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
const Enum_1 = require("../Utils/Enum");
const BaseRequestHandle_1 = __importDefault(require("../Utils/BaseRequestHandle"));
const Services_1 = require("../Services");
const Authorization_1 = __importDefault(require("../Authorization/Authorization"));
const Libs_1 = require("../Libs");
const Validators_1 = require("../Validators");
const Utils_1 = require("../Utils");
class UserController {
    static createRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                Libs_1.Logger.info('Creating Role...');
                const roles = yield Services_1.UserService.getRoles();
                if ((roles === null || roles === void 0 ? void 0 : roles.length) == 2) {
                    BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.BAD_REQUEST, 'Roles Exceeded');
                    Libs_1.Logger.info('Roles Exceeded');
                    return BaseRequestHandle_1.default.send(res);
                }
                const createdRole = yield Services_1.UserService.role(data);
                BaseRequestHandle_1.default.setSuccess(Enum_1.HTTP_CODES.CREATED, 'Role created', createdRole);
                Libs_1.Logger.info('Role Created...');
                return BaseRequestHandle_1.default.send(res);
            }
            catch (error) {
                Libs_1.Logger.error('Error Creating Role...');
                BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.INTERNAL_SERVER_ERROR, Enum_1.ResponseMessage.INTERNAL_SERVER_ERROR);
                return BaseRequestHandle_1.default.send(res);
            }
        });
    }
    static getRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield Services_1.UserService.getRoles();
                BaseRequestHandle_1.default.setSuccess(Enum_1.HTTP_CODES.CREATED, 'Roles Received', roles);
                return BaseRequestHandle_1.default.send(res);
            }
            catch (error) {
                BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.INTERNAL_SERVER_ERROR, Enum_1.ResponseMessage.INTERNAL_SERVER_ERROR);
                return BaseRequestHandle_1.default.send(res);
            }
        });
    }
    static fetchUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield Services_1.UserService.getUsers();
                if (!users) {
                    BaseRequestHandle_1.default.setSuccess(Enum_1.HTTP_CODES.RESOURCE_NOT_FOUND, 'Users not received', users);
                    return BaseRequestHandle_1.default.send(res);
                }
                BaseRequestHandle_1.default.setSuccess(Enum_1.HTTP_CODES.OK, 'users received', users);
                return BaseRequestHandle_1.default.send(res);
            }
            catch (error) {
                BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.INTERNAL_SERVER_ERROR, Enum_1.ResponseMessage.INTERNAL_SERVER_ERROR);
                return BaseRequestHandle_1.default.send(res);
            }
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const user = data.role;
            yield Validators_1.UserValidator.createAccount(data, res, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield prisma_1.Prisma.user.findUnique({
                        where: { email: req.body.email }
                    });
                    if (user) {
                        BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.CONFLICT, `Email already taken`);
                        return BaseRequestHandle_1.default.send(res);
                    }
                    Libs_1.Logger.info(`Registering ${data.role}... 🏃‍♂️`);
                    data.roleId =
                        data.role === 'Patron' ? Utils_1.ACL_ROLES.PATRON : Utils_1.ACL_ROLES.ARTISAN;
                    delete data.role;
                    data.password = data.password
                        ? Authorization_1.default.createHash(data.password)
                        : '';
                    const createdUser = yield Services_1.UserService.create(data);
                    Libs_1.Logger.info(`${user} Registered Successfully😅`);
                    BaseRequestHandle_1.default.setSuccess(Enum_1.HTTP_CODES.CREATED, `${user} Registered Successfully`, createdUser);
                    return BaseRequestHandle_1.default.send(res);
                }
                catch (error) {
                    Libs_1.Logger.error(`Error Registering ${user} : ${JSON.stringify(error)}  😠`);
                    BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.INTERNAL_SERVER_ERROR, `${Enum_1.ResponseMessage.INTERNAL_SERVER_ERROR + error}`);
                    return BaseRequestHandle_1.default.send(res);
                }
            }));
        });
    }
    static joinWaitList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Validators_1.UserValidator.joinWaitList(req.body, res, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield prisma_1.Prisma.user.findUnique({
                        where: { email: req.body.email }
                    });
                    if (user) {
                        BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.CONFLICT, `You are already in our wait list`);
                        return BaseRequestHandle_1.default.send(res);
                    }
                    const is_joined = yield Services_1.UserService.joinWaitList(req.body.email);
                    BaseRequestHandle_1.default.setSuccess(Enum_1.HTTP_CODES.CREATED, 'Hi there, Thank you for your interest in our services, we will keep you in touch with all relevant update to our services and coverage.A-hub Team ', is_joined);
                    return BaseRequestHandle_1.default.send(res);
                }
                catch (error) {
                    BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.INTERNAL_SERVER_ERROR + error, Enum_1.ResponseMessage.INTERNAL_SERVER_ERROR);
                    return BaseRequestHandle_1.default.send(res);
                }
            }));
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map