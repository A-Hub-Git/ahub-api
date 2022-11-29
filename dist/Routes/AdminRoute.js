"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("../Controllers");
const Router = express_1.default.Router();
class AdminRouter {
    get() {
        Router.get('/', Controllers_1.UserController.fetchUsers);
    }
    post() { }
}
new AdminRouter().get();
new AdminRouter().post();
exports.default = Router;
//# sourceMappingURL=AdminRoute.js.map