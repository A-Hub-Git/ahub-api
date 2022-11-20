"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Authorization_1 = __importDefault(require("../Authorization/Authorization"));
const Utils_1 = require("../Utils");
const { ARTISAN, PATRON } = Utils_1.ACL_ROLES;
class AuthMiddleware extends Authorization_1.default {
}
exports.default = AuthMiddleware;
_a = AuthMiddleware;
AuthMiddleware.ArtisanAccess = _a.VerifyUserToken([ARTISAN]);
AuthMiddleware.PatronAccess = _a.VerifyUserToken([PATRON]);
AuthMiddleware.ArtisanPatronAccess = _a.VerifyUserToken([ARTISAN, PATRON]);
AuthMiddleware.FullAccess = _a.VerifyUserToken([ARTISAN, PATRON]);
//# sourceMappingURL=Auth.js.map