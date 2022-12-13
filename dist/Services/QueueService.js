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
Object.defineProperty(exports, "__esModule", { value: true });
const Libs_1 = require("../Libs");
const amqp_ts_1 = require("@droidsolutions-oss/amqp-ts");
const Constant_1 = require("../Constant");
const sendOTP = Libs_1.RabbitMq.declareQueue(Constant_1.SEND_OTP, {
    durable: true
});
class QueueService {
    static sendOTP(phone, message, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { phone, message, userId };
            sendOTP.send(new amqp_ts_1.Message(payload, {
                contentType: 'application/json'
            }));
        });
    }
}
exports.default = QueueService;
//# sourceMappingURL=QueueService.js.map