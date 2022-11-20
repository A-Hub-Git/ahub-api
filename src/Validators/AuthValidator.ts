import {Response} from 'express';
import BaseValidator from './BaseValidator';
import {User} from '../prisma';
export default class AuthValidator extends BaseValidator {
  static async login(data: User, res: Response, cb: () => any) {
    const rules = {
      email: 'required|email',
      password: 'required|min:6'
    };
    await this.validator(data, rules, res, cb);
  }
  static async resendOtp(userId: any, res: Response, cb: () => any) {
    const rule = {
      user_id: 'require|string'
    };
    await this.validator(userId, rule, res, cb);
  }
}
