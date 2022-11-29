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
        Router.post('/login', Controllers_1.AuthController.signIn); // Route to SignIn to Your Account
        Router.post('/resend-otp/:user_id', Controllers_1.AuthController.resendOtp); // Route to Resend an OTP if Not Received
        Router.post('/verify-otp/:otp', Middleware_1.AuthMiddleware.ArtisanPatronAccess, Controllers_1.AuthController.verify_otp); // Route to Verify OTP
        Router.post('/update-password', Middleware_1.AuthMiddleware.FullAccess, Controllers_1.AuthController.updatePassword); //Route to Update Password
        Router.post('/forgot-password', Controllers_1.AuthController.forgetPassword);
        Router.post('/verify-password-otp', Controllers_1.AuthController.verifyResetPassword);
        Router.post('/confirm-reset-password', Controllers_1.AuthController.confirmResetPassword);
    }
}
new AuthRoute().post();
exports.default = Router;
//# sourceMappingURL=AuthRoute.js.map