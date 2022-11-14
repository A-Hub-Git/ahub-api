"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const Libs_1 = require("../Libs");
const App_1 = __importDefault(require("./App"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.port = process.env.PORT;
    }
    createServer() {
        (0, http_1.createServer)(App_1.default).listen(this.port);
        Libs_1.Logger.info(`Server Listening on port: ${this.port}`);
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map