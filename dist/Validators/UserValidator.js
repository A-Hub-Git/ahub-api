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
class UserValidator extends BaseValidator_1.default {
    static createAccount(data, res, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rules = {
                full_name: 'required|alpha',
                email: 'required|email',
                phone: ['required', 'regex:/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/'],
                password: 'min:6',
                role: 'required|alpha|in:Patron,Artisan'
            };
            this.validator(data, rules, res, cb);
        });
    }
    static emailOrPhone(data, res, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rule = {
                email: 'email',
                phone: ['regex:/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/']
            };
            yield this.validator(data, rule, res, cb);
        });
    }
    static joinWaitList(data, res, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rule = {
                email: 'required|email'
            };
            yield this.validator(data, rule, res, cb);
        });
    }
    static contactUs(data, res, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rule = {
                'contact.email': 'required|email',
                'contact.firstName': 'required|alpha',
                'contact.lastName': 'required|alpha',
                subject: 'required|string',
                description: 'required|string'
            };
            yield this.validator(data, rule, res, cb);
        });
    }
}
exports.default = UserValidator;
//# sourceMappingURL=UserValidator.js.map