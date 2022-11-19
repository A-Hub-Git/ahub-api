"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("../Controllers");
const Router = express_1.default.Router();
class AuthRoute {
    post() {
        Router.post('/login', Controllers_1.AuthController.signIn);
    }
}
new AuthRoute().post();
exports.default = Router;
//# sourceMappingURL=AuthRoute.js.map