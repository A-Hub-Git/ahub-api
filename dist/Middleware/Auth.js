"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Libs_1 = require("../Libs");
const Utils_1 = require("../Utils");
const { ARTISAN, PATRON } = Utils_1.ACL_ROLES;
class AuthMiddleware extends Libs_1.Authorization {
}
exports.default = AuthMiddleware;
_a = AuthMiddleware;
AuthMiddleware.ArtisanAccess = _a.VerifyUserToken([ARTISAN]);
AuthMiddleware.PatronAccess = _a.VerifyUserToken([PATRON]);
AuthMiddleware.ArtisanPatronAccess = _a.VerifyUserToken([ARTISAN, PATRON]);
AuthMiddleware.FullAccess = _a.VerifyUserToken([ARTISAN, PATRON]);
//# sourceMappingURL=Auth.js.map