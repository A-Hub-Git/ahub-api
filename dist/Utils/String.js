"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const randomstring_1 = __importDefault(require("randomstring"));
class String {
    constructor() {
        this.randomstring = randomstring_1.default.generate;
    }
    static otp() {
        const otp = randomstring_1.default.generate({
            length: 4,
            charset: 'number'
        });
        return otp;
    }
    static artisanId() {
        const id = randomstring_1.default.generate({
            length: 5,
            charset: 'number'
        });
        return 'ARTISAN' + id;
    }
}
exports.default = String;
//# sourceMappingURL=String.js.map