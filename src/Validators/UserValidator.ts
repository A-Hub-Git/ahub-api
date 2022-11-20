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
      password: 'required|min:6',
      role: 'required|alpha|in:Patron,Artisan'
    };
    const user = await Prisma.user.findUnique({where: {email: data.email}});
    if (user) {
      BaseRequestHandle.setError(
        HTTP_CODES.CONFLICT,
        `user with this email: ${data.email} exist`
      );
      return BaseRequestHandle.send(res);
    }
    this.validator(data, rules, res, cb);
  }
}
