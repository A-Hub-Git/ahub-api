"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mail = exports.Task = exports.Auth = exports.Role = exports.User = void 0;
const UserRoute_1 = __importDefault(require("./UserRoute"));
exports.User = UserRoute_1.default;
const RoleRoute_1 = __importDefault(require("./RoleRoute"));
exports.Role = RoleRoute_1.default;
const AuthRoute_1 = __importDefault(require("./AuthRoute"));
exports.Auth = AuthRoute_1.default;
const TaskRoute_1 = __importDefault(require("./TaskRoute"));
exports.Task = TaskRoute_1.default;
const MailRoute_1 = __importDefault(require("./MailRoute"));
exports.Mail = MailRoute_1.default;
//# sourceMappingURL=index.js.map