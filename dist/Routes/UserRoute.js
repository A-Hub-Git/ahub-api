"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("../Controllers");
const Router = express_1.default.Router();
class UserRouter {
    get() {
        Router.get('/', Controllers_1.UserController.fetchUsers);
    }
    post() {
        Router.post('/', Controllers_1.UserController.createUser);
        Router.post('/wait-list', Controllers_1.UserController.joinWaitList);
    }
}
new UserRouter().get();
new UserRouter().post();
exports.default = Router;
//# sourceMappingURL=UserRoute.js.map