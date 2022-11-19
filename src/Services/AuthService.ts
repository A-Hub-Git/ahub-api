import bcrypt from 'bcryptjs';
import {User} from '../prisma';
import {Authorization} from '../Libs';

export default class AuthService {
  static async login(data: User | any, _password: string) {
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
