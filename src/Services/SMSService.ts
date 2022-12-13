import moment from 'moment';
import Axios from 'axios';
const nodemailer = require('nodemailer');
import {Prisma, VerificationToken} from '../prisma';
import Authorization from '../Authorization/Authorization';
import {Logger} from '../Libs';
import String from '../Utils/String';
import {mailerConfig, termiiConfig} from '../config';

class SMSService {
  private httpService;

  constructor() {
    this.httpService = Axios.create({
      baseURL: termiiConfig.baseUrl
    });
  }

  async sendOtp(
    recipients: string[] | string,
    message: string,
    userId: string
  ) {
    const _recipients = Array.isArray(recipients) ? recipients : [recipients];
    const to = this._prunRecipients(_recipients);
    const otp = message + ': ' + (await this.generateOtp(userId));
    return this.send(to, otp);
  }

  async send(to: string[] | string, sms: string, channel = 'dnd') {
    const data = this._loadData({to, sms, channel});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.httpService.post('/sms/send', data);
        console.log('sms sent');
        resolve(response.data);
      } catch (error) {
        Logger.error(`SMS Error: ${JSON.stringify(error)}`);
        reject(error);
      }
    });
  }

  _loadData(extra = {}) {
    const {from, api_key} = this._loadConfig();

    return {
      type: 'plain',
      channel: 'dnd',
      from,
      api_key,
      ...extra
    };
  }

  _loadConfig() {
    return termiiConfig;
  }

  _prunRecipients(recipients: string[] | string) {
    return Array.isArray(recipients)
      ? recipients.map(phone => phone.replace(/[^0-9]/g, ''))
      : recipients;
  }
  async generateOtp(userId: string) {
    return new Promise(async (resolve, reject) => {
      const expires_at = moment().add(10, 'm').toDate();
      const otp = String.otp();
      const token = Authorization.createHash(otp);

      try {
        const exist = await Prisma.verificationToken.findFirst({
          where: {userId} as VerificationToken
        });
        if (!exist) {
          await Prisma.verificationToken.create({
            data: {
              token,
              userId,
              expires_at
            } as VerificationToken
          });
          return resolve(otp);
        }

        await Prisma.verificationToken.update({
          where: {id: exist.id} as VerificationToken,
          data: {
            expires_at,
            token
          }
        });
        return resolve(otp);
      } catch (error) {
        Logger.error(`Error generating OTP: ${JSON.stringify(error)}`);
        return reject(error);
      }
    });
  }
  verifyOtp(userId: string, token: string) {
    return new Promise(async (resolve, reject) => {
      const isOtp = await Prisma.verificationToken.findFirst({
        where: {userId} as VerificationToken
      });
      try {
        if (
          isOtp &&
          Authorization.compareHash(token, isOtp.token) &&
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
}

export default new SMSService();
