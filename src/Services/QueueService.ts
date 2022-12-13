import {RabbitMq} from '../Libs';
import {Message} from '@droidsolutions-oss/amqp-ts';
import {SEND_OTP} from '../Constant';

const sendOTP = RabbitMq.declareQueue(SEND_OTP, {
  durable: true
});

export default class QueueService {
  static async sendOTP(phone: any, message: string, userId: any) {
    const payload = {phone, message, userId};
    sendOTP.send(
      new Message(payload, {
        contentType: 'application/json'
      })
    );
  }
}
