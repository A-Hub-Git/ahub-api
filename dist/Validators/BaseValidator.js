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
const Enum_1 = require("../Utils/Enum");
const express_validator_1 = require("express-validator");
const BaseRequestHandle_1 = __importDefault(require("../Utils/BaseRequestHandle"));
const validatorjs_1 = __importDefault(require("validatorjs"));
class BaseValidator {
    static validator(data, rules, res, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const validator = new validatorjs_1.default(data, rules);
            if (validator.fails()) {
                BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.UN_PROCESSABLE_ENTITY, Object.values(validator.errors.errors)[0][0]);
                return BaseRequestHandle_1.default.send(res);
            }
            yield cb();
        });
    }
    static validate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = (0, express_validator_1.validationResult)(req);
            if (error.isEmpty()) {
                return next();
            }
            const errors = [];
            error.array().map((error) => errors.push({ [error.param]: error.msg }));
            BaseRequestHandle_1.default.setError(Enum_1.HTTP_CODES.UN_PROCESSABLE_ENTITY, errors[0]);
            BaseRequestHandle_1.default.send(res);
        });
    }
}
exports.default = BaseValidator;
//# sourceMappingURL=BaseValidator.js.map