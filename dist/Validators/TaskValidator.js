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
    static addTask(data, res, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rules = {
                name: 'required|string',
                type: 'alpha|in:Percel',
                amount: 'required|numeric',
                note: 'string',
                is_fragile: 'boolean',
                weightKg: 'required|numeric',
                recipient_name: 'required|alpha',
                recipient_phone: [
                    'required',
                    'regex:/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/'
                ],
                patron_id: 'required|string'
            };
            this.validator(data, rules, res, cb);
        });
    }
    static acceptTask(data, res, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rules = {
                task_id: 'required|string',
                rider_id: 'required|string',
                status: 'required|string'
            };
            this.validator(data, rules, res, cb);
        });
    }
}
exports.default = UserValidator;
//# sourceMappingURL=TaskValidator.js.map