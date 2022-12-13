"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.Auth = exports.Role = exports.User = void 0;
const UserRoute_1 = __importDefault(require("./UserRoute"));
exports.User = UserRoute_1.default;
const Role_1 = __importDefault(require("./Role"));
exports.Role = Role_1.default;
const AuthRoute_1 = __importDefault(require("./AuthRoute"));
exports.Auth = AuthRoute_1.default;
const TaskRoute_1 = __importDefault(require("./TaskRoute"));
exports.Task = TaskRoute_1.default;
//# sourceMappingURL=index.js.map