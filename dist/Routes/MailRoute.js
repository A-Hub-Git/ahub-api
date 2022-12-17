"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("../Controllers");
const Router = express_1.default.Router();
class MailRouter {
    get() { }
    post() {
        Router.post('/', Controllers_1.MailController.sendUsMail);
    }
}
new MailRouter().get();
new MailRouter().post();
exports.default = Router;
//# sourceMappingURL=MailRoute.js.map