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
const Constant_1 = require("../Constant");
const Services_1 = require("../Services");
const OTP_ProcessQueue = Libs_1.RabbitMq.declareQueue(Constant_1.SEND_OTP, {
    durable: true,
    prefetch: 1
});
Libs_1.RabbitMq.completeConfiguration().then(() => {
    OTP_ProcessQueue.activateConsumer((msg) => __awaiter(void 0, void 0, void 0, function* () {
        const { phone, message, userId } = msg.getJsonContent();
        yield Services_1.SMSService.sendOtp(phone, message, userId)
            .then(() => {
            Libs_1.Logger.info('OTP Sent');
            msg.ack();
        })
            .catch(error => {
            Libs_1.Logger.error(`OTP ERROR: ${error}`);
            msg.nack();
        });
    })).then(() => {
        Libs_1.Logger.info('SMS SERVICE PROCESS QUEUE');
    });
});
//# sourceMappingURL=communicationConsumer.js.map