import {HTTP_CODES} from '../Utils/Enum';
import BaseValidator from './BaseValidator';
import {Prisma, User} from '../prisma';
import {Response} from 'express';
import BaseRequestHandle from '../Utils/BaseRequestHandle';

export default class UserValidator extends BaseValidator {
  static async createAccount(data: User, res: Response, cb: () => any) {
    const rules = {
      full_name: 'required|alpha',
      email: 'required|email',
      phone: ['required', 'regex:/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/'],
      password: 'min:6',
      role: 'required|alpha|in:Patron,Artisan'
    };
    this.validator(data, rules, res, cb);
  }
  static async emailOrPhone(data: any, res: Response, cb: () => any) {
    const rule = {
      email: 'email',
      phone: ['regex:/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/']
    };
    await this.validator(data, rule, res, cb);
  }
  static async joinWaitList(data: any, res: Response, cb: () => any) {
    const rule = {
      email: 'required|email'
    };

    await this.validator(data, rule, res, cb);
  }
}
