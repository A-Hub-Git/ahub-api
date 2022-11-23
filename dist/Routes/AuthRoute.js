"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("../Controllers");
const Middleware_1 = require("../Middleware");
const Router = express_1.default.Router();
class AuthRoute {
    post() {
        Router.post('/login', Controllers_1.AuthController.signIn);
        Router.post('/resend-otp/:user_id', Controllers_1.AuthController.resendOtp);
        Router.post('/verify-otp/:otp', Middleware_1.AuthMiddleware.ArtisanPatronAccess, Controllers_1.AuthController.verify_otp);
    }
}
new AuthRoute().post();
exports.default = Router;
//# sourceMappingURL=AuthRoute.js.map