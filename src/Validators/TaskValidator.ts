import {HTTP_CODES} from '../Utils/Enum';
import BaseValidator from './BaseValidator';
import {Prisma, User} from '../prisma';
import {Response} from 'express';
import BaseRequestHandle from '../Utils/BaseRequestHandle';

export default class UserValidator extends BaseValidator {
  static async addTask(data: User, res: Response, cb: () => any) {
    const rules = {
      name: 'required|string',
      type: 'alpha|in:Percel',
      amount: 'required|numeric',
      note: 'string',
      is_fragile: 'boolean',
      weightKg: 'required|numeric',
      recipient_name: 'required|alpha',
      recipient_phone: [
        'required',
        'regex:/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/'
      ],
      patron_id: 'required|string'
    };
    this.validator(data, rules, res, cb);
  }
  static async acceptTask(data: User, res: Response, cb: () => any) {
    const rules = {
      task_id: 'required|string',
      rider_id: 'required|string',
      status: 'required|string'
    };
    this.validator(data, rules, res, cb);
  }
}
