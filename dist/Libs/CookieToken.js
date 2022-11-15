"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
class Helper {
    static cookieToken(user, res) {
        const token = this.getJwtToken(user.id);
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        user.password = null;
        res.status(200).cookie('token', token, options).json({
            message: 'Login Successful.',
            token,
            user
        });
    }
}
exports.default = Helper;
Helper.getJwtToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, config_1.JWT_SECRET, { expiresIn: '1 day' });
};
//# sourceMappingURL=CookieToken.js.map