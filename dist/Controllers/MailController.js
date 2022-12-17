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
const ZohoService_1 = __importDefault(require("../Services/ZohoService"));
const BaseRequestHandle_1 = __importDefault(require("../Utils/BaseRequestHandle"));
const Utils_1 = require("../Utils");
const Validators_1 = require("../Validators");
class MailController {
    static sendUsMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Validators_1.UserValidator.contactUs(req.body, res, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    req.body.departmentId = '803113000000006907';
                    const mail = yield ZohoService_1.default.createTicket(req.body);
                    BaseRequestHandle_1.default.setSuccess(Utils_1.HTTP_CODES.CREATED, 'Mail Sent', mail);
                    return BaseRequestHandle_1.default.send(res);
                }
                catch (error) {
                    BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.INTERNAL_SERVER_ERROR + error, `Internal Server Error`);
                    return BaseRequestHandle_1.default.send(res);
                }
            }));
        });
    }
}
exports.default = MailController;
//# sourceMappingURL=MailController.js.map