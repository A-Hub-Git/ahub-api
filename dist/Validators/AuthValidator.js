"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValidator_1 = __importDefault(require("./BaseValidator"));
class AuthValidator extends BaseValidator_1.default {
    static login(data, res, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rules = {
                email: 'required|email',
                password: 'required|min:6'
            };
            yield this.validator(data, rules, res, cb);
        });
    }
    static resendOtp(userId, res, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rule = {
                user_id: 'require|string'
            };
            yield this.validator(userId, rule, res, cb);
        });
    }
}
exports.default = AuthValidator;
//# sourceMappingURL=AuthValidator.js.map