"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Libs_1 = require("../Libs");
class AuthMiddleware extends Libs_1.Authorization {
}
exports.default = AuthMiddleware;
_a = AuthMiddleware;
AuthMiddleware.ArtisanAccess = _a.VerifyUserToken([]);
AuthMiddleware.PatronAccess = _a.VerifyUserToken(['']);
AuthMiddleware.ArtisanPatronAccess = _a.VerifyUserToken(['']);
AuthMiddleware.FullAccess = _a.VerifyUserToken([]);
//# sourceMappingURL=Auth.js.map