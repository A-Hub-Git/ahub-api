import {HTTP_CODES} from './../Utils/ResponseCode';
import BaseValidator from './BaseValidator';
import {Prisma, User} from '../prisma';
import {Response} from 'express';
import BaseRequestHandle from '../Server/BaseRequestHandle';

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
  //   static createAccount = () => {
  //     return [
  //       body('full_name').isAlpha().normalizeEmail().notEmpty(),
  //       body('email').isEmail().notEmpty(),
  //       body('phone', 'Invalid mobile number.')
  //         .escape()
  //         .isLength({min: 6})
  //         .exists({checkFalsy: true})
  //         .matches(/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/)
  //         .notEmpty(),
  //       body('password').isAlphanumeric().notEmpty().isStrongPassword({
  //         minLength: 6,
  //         minLowercase: 1,
  //         minUppercase: 1,
  //         minNumbers: 1,
  //         minSymbols: 1
  //       })
  //     ];
  //   };
}
