import {Message} from '@droidsolutions-oss/amqp-ts';
import {Logger, RabbitMq} from '../Libs';
import {SEND_OTP} from '../Constant';
import {SMSService} from '../Services';

interface OTP {
  phone: string;
  message: string;
  userId: string;
}
const OTP_ProcessQueue = RabbitMq.declareQueue(SEND_OTP, {
  durable: true,
  prefetch: 1
});

RabbitMq.completeConfiguration().then(() => {
  OTP_ProcessQueue.activateConsumer(async (msg: Message) => {
    const {phone, message, userId} = msg.getJsonContent<OTP>();
    await SMSService.sendOtp(phone, message, userId)
      .then(() => {
        Logger.info('OTP Sent');
        msg.ack();
      })
      .catch(error => {
        Logger.error(`OTP ERROR: ${error}`);
        msg.nack();
      });
  }).then(() => {
    Logger.info('SMS SERVICE PROCESS QUEUE');
  });
});
