import {Prisma} from '../prisma';
import {Request, Response} from 'express';
import BaseRequestHandle from '../Server/BaseRequestHandle';
import AuthService from '../Services/AuthService';
import {Logger} from '../Libs';

export default class AuthController {
  static async signIn(req: Request, res: Response) {
    const {email, password} = req.body;
    try {
      Logger.info('Signing In.....');
      const user = await Prisma.user.findUnique({
        where: {email}
      });
      const data = await AuthService.login(user, password.trim());
      BaseRequestHandle.setSuccess(200, 'Login Successfully...', data);
      return BaseRequestHandle.send(res);
    } catch (error: any) {
      Logger.error('Login failed. Please try again later.');
      const message =
        error.status == 401
          ? error.message
          : 'Login failed. Please try again later.';
      BaseRequestHandle.setError(401, message);
      return BaseRequestHandle.send(res);
    }
  }
}
