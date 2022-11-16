import bcrypt from 'bcryptjs';
import {Response} from 'express';
import {IUser} from '../typings';
import {Authorization} from '../Libs';

interface ILogin {
  data: IUser | any;
  _password: string;
  res: Response;
  roleId?: string;
}
export default class AuthService {
  static async login(data: IUser | any, _password: string) {
    const error: any = new Error();

    return new Promise(async function (resolve, reject) {
      if (data) {
        const {password, ...user} = data;
        if (bcrypt.compareSync(_password, password)) {
          //   if (roleId && user.roleId != roleId) {
          //     error.status = 401;
          //     error.message = 'Unauthorized access.';
          //     reject(error);
          //   }
          user.password = null;
          const token = await Authorization.getJwtToken(user.id);
          resolve({user, token});
        }

        error.status = 401;
        error.message = 'Invalid login credentials';
        reject(error);
      } else {
        error.status = 401;
        error.message = 'Invalid login credentials';
        reject(error);
      }
    });
  }
}
