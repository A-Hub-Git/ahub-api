"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("../Controllers");
const Router = express_1.default.Router();
Router.post('/', Controllers_1.UserController.createUser);
Router.route('/').get(Controllers_1.UserController.fetchUsers);
exports.default = Router;
//# sourceMappingURL=user.js.map