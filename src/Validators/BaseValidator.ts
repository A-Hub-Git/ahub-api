import {HTTP_CODES} from './../Utils/ResponseCode';
import {Request, Response, NextFunction} from 'express';
import {validationResult, query} from 'express-validator';
import BaseRequestHandle from '../Server/BaseRequestHandle';
import Validator from 'validatorjs';
import {User} from '../prisma';
export default class BaseValidator {
  static async validator(data: User, rules: any, res: Response, cb: () => any) {
    const validator = new Validator(data, rules);
    if (validator.fails()) {
      BaseRequestHandle.setError(
        HTTP_CODES.UN_PROCESSABLE_ENTITY,
        Object.values(validator.errors.errors)[0][0] as any
      );
      return BaseRequestHandle.send(res);
    }
    await cb();
  }
  static validate(req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    if (error.isEmpty()) {
      return next();
    }
    const errors: any = [];
    error.array().map((error: any) => errors.push({[error.param]: error.msg}));
    BaseRequestHandle.setError(HTTP_CODES.UN_PROCESSABLE_ENTITY, errors[0]);
    BaseRequestHandle.send(res);
  }
}
