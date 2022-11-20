import {Prisma, User} from '../prisma';
import {Request, Response} from 'express';
import BaseRequestHandle from '../Utils/BaseRequestHandle';
import AuthService from '../Services/AuthService';
import Authorization from '../Authorization/Authorization';
import {Logger} from '../Libs';
import AuthValidator from '../Validators/AuthValidator';
import Cache from '../Utils/BaseCache';
import Constant from '../Constant';
import {HTTP_CODES} from '../Utils';
import CommunicationService from '../Services/CommunicationService';

export default class AuthController extends CommunicationService {
  static async signIn(req: Request, res: Response) {
    const {email, password} = req.body;
    await AuthValidator.login(req.body, res, async () => {
      //await Cache('sign in', async () => {
      try {
        Logger.info('Signing In.....');
        const user = await Prisma.user.findUnique({
          where: {email}
        });
        await AuthService.login(user, password.trim());
        await Authorization.cookieToken(user, res);
      } catch (error: any) {
        Logger.error(`Login failed. Please try again later.: ${error}`);
        const message =
          error.status == 401
            ? error.message
            : 'Login failed. Please try again later.';
        BaseRequestHandle.setError(401, message);
        return BaseRequestHandle.send(res);
      }
    });
    // });
  }
  static async resendOtp(req: Request, res: Response) {
    await AuthValidator.resendOtp(req.params.user_id, res, async () => {
      try {
        const user = await Prisma.user.findFirst({
          where: {id: req.params.user_id}
        });
        await CommunicationService.sendSms(
          user?.phone as string,
          user?.id as string
        );
        BaseRequestHandle.setSuccess(HTTP_CODES.CREATED, 'otp sent');
        return BaseRequestHandle.send(res);
      } catch (error) {
        BaseRequestHandle.setError(
          HTTP_CODES.INTERNAL_SERVER_ERROR,
          `Internal Server Error. Contact Support.. : ${error}`
        );
        return BaseRequestHandle.send(res);
      }
    });
  }
}
