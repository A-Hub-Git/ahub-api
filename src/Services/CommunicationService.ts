import moment from 'moment';
import Axios from 'axios';
import {Prisma, VerificationToken} from '../prisma';
import Authorization from '../Authorization/Authorization';
import {Logger} from '../Libs';
import String from '../Utils/String';
import {sinchConfig} from '../config';

export default class CommunicationService extends Authorization {
  static async generateOtp(userId: string) {
    return new Promise(async (resolve, reject) => {
      const expires_at = moment().add(10, 'm').toDate();
      const token = this.createHash('1234');

      try {
        const exist = await Prisma.verificationToken.findFirst({
          where: {userId} as VerificationToken
        });
        if (!exist) {
          const created = await Prisma.verificationToken.create({
            data: {
              token,
              userId,
              expires_at
            } as VerificationToken
          });
          return resolve(created);
        }

        const updated = await Prisma.verificationToken.update({
          where: {id: exist.id} as VerificationToken,
          data: {
            expires_at,
            token
          }
        });
        return resolve(updated);
      } catch (error) {
        Logger.error(`Error generating OTP: ${JSON.stringify(error)}`);
        return reject(error);
      }
    });
  }
  static verifyOtp(userId: string, token: string) {
    return new Promise(async (resolve, reject) => {
      const isOtp = await Prisma.verificationToken.findFirst({
        where: {userId} as VerificationToken
      });
      console.log(isOtp?.expires_at);
      try {
        if (
          isOtp &&
          this.compareHash(token, isOtp.token) &&
          moment().isBefore(isOtp.expires_at)
        ) {
          return resolve(true);
        }
        return resolve(false);
      } catch (error) {
        reject(error);
      }
    });
  }

  static sendSms(phone_number: string, userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          `${sinchConfig.SINCH_BASE_URL}/v1/${sinchConfig.SINCH_SERVICE_PLAN_ID}/batches`,
          {
            from: sinchConfig.SINCH_SINCH_NUMBER,
            to: [`${phone_number}`],
            body: `your OTP ${this.generateOtp(userId)}`
          },
          {
            headers: {
              Authorization: `Bearer ${sinchConfig.SINCH_API_TOKEN}`
            }
          }
        );
        Logger.info('OPT sent');
        resolve(response.data);
      } catch (error) {
        Logger.error(`OTP Error`);
        reject(error);
      }
    });
  }
}
