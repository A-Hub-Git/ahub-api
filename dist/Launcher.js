"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./Server/Server"));
class Launcher {
    constructor() {
        this.server = new Server_1.default();
    }
    launchApp() {
        this.server.createServer();
    }
}
new Launcher().launchApp();
//# sourceMappingURL=Launcher.js.map