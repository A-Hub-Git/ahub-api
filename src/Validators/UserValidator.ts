import BaseValidator from './BaseValidator';
import {User} from '../prisma';
import {Response} from 'express';

export default class UserValidator extends BaseValidator {
  static async createAccount(data: User, res: Response, cb: () => any) {
    const rules = {
      full_name: 'required|alpha',
      email: 'required|email',
      phone: ['required', 'regex:/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/'],
      password: 'required|min:6',
      role: 'required|alpha|in:Patron,Artisan'
    };
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
