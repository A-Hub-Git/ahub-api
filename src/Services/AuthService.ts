import bcrypt from 'bcryptjs';
import {Response} from 'express';
import {User} from '../prisma';
import Authorization from '../Authorization/Authorization';

export default class AuthService {
  static async login(data: User | any, _password: string) {
    const error: any = new Error();

    return new Promise(async function (resolve, reject) {
      if (data) {
        const {password, ...user} = data;
        if (bcrypt.compareSync(_password, password)) {
          user.password = '';
          const token = await Authorization.getJwtToken(user);
          return resolve({user, token});
        }

        error.status = 401;
        error.message = 'Invalid login credentials';
        return reject(error);
      } else {
        error.status = 401;
        error.message = 'Invalid login credentials';
        return reject(error);
      }
    });
  }
}
