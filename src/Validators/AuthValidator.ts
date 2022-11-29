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
  static async verifyOtp(otp: any, res: Response, cb: () => any) {
    const rule = {
      otp: 'required|digits:4'
    };
    await this.validator(otp, rule, res, cb);
  }
  static async updatePassword(data: any, res: Response, cb: () => any) {
    const rule = {
      old_password: 'required|min:6',
      new_password: 'required|min:6'
    };
    await this.validator(data, rule, res, cb);
  }
}
