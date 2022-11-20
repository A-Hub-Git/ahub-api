"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("../Controllers");
const Router = express_1.default.Router();
Router.route('/').get(Controllers_1.UserController.getRoles).post(Controllers_1.UserController.createRole);
exports.default = Router;
//# sourceMappingURL=Role.js.map