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
const Libs_1 = require("../Libs");
class AuthService {
    static login(data, _password) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = new Error();
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        const { password } = data, user = __rest(data, ["password"]);
                        if (bcryptjs_1.default.compareSync(_password, password)) {
                            //   if (roleId && user.roleId != roleId) {
                            //     error.status = 401;
                            //     error.message = 'Unauthorized access.';
                            //     reject(error);
                            //   }
                            const token = yield Libs_1.Authorization.getJwtToken(user.id);
                            resolve({ user, token });
                        }
                        error.status = 401;
                        error.message = 'Invalid login credentials';
                        reject(error);
                    }
                    else {
                        error.status = 401;
                        error.message = 'Invalid login credentials';
                        reject(error);
                    }
                });
            });
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map