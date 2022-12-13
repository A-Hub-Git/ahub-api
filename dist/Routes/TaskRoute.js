"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Middleware_1 = require("../Middleware");
const Controllers_1 = require("../Controllers");
const Router = express_1.default.Router();
class TaskRouter {
    get() {
        Router.get('/patron', Middleware_1.AuthMiddleware.PatronAccess, Controllers_1.TaskController.patronTasks);
    }
    post() {
        Router.post('/', Middleware_1.AuthMiddleware.PatronAccess, Controllers_1.TaskController.createTask);
        Router.post('/accept', Middleware_1.AuthMiddleware.ArtisanAccess, Controllers_1.TaskController.acceptTask);
    }
}
new TaskRouter().get();
new TaskRouter().post();
exports.default = Router;
//# sourceMappingURL=TaskRoute.js.map