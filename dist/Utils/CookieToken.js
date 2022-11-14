"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../Libs/jwt"));
class Helper {
    static cookieToken(user, res) {
        const token = (0, jwt_1.default)(user.id);
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        user.password = null;
        res.status(200).cookie('token', token, options).json({
            message: 'success',
            token,
            user
        });
    }
}
exports.default = Helper;
//# sourceMappingURL=CookieToken.js.map