import {Prisma, User} from '../prisma';
import {Request, Response} from 'express';
import BaseRequestHandle from '../Utils/BaseRequestHandle';
import AuthService from '../Services/AuthService';
import moment from 'moment';
import {Logger} from '../Libs';
import AuthValidator from '../Validators/AuthValidator';
import Cache from '../Utils/BaseCache';
import {HTTP_CODES} from '../Utils';
import {SMSService} from '../Services';
import {UserService} from '../Services';
import {UserValidator} from '../Validators';
import QueueService from '../Services/QueueService';

export default class AuthController {
  static async signIn(req: Request, res: Response) {
    const {email, password} = req.body;
    await AuthValidator.login(req.body, res, async () => {
      try {
        //const data = await Cache.baseCache('login', async () => {
        Logger.info('Signing In.....');
        const user = await Prisma.user.findUnique({
          where: {email}
        });
        const data = await AuthService.login(user, password.trim());
        BaseRequestHandle.setSuccess(
          HTTP_CODES.CREATED,
          'Login Successful.',
          data
        );
        return BaseRequestHandle.send(res);
        //});
        //return await Authorization.cookieToken(data, res);
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
  }
  static async resendOtp(req: Request, res: Response) {
    try {
      const user = await Prisma.user.findFirst({
        where: {id: req.user.id}
      });
      await QueueService.sendOTP(
        user?.phone as string,
        'Enter this OTP to verify your account',
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
  }
  static async verify_otp(req: Request, res: Response) {
    const otp = Number(req.params.otp);
    const user = req.user;
    await AuthValidator.verifyOtp(req.params, res, async () => {
      try {
        const valid = await SMSService.verifyOtp(user.id, `${otp}`);

        if (!valid) {
          BaseRequestHandle.setError(
            HTTP_CODES.BAD_REQUEST,
            'Invalid or wrong otp.'
          );
          return BaseRequestHandle.send(res);
        }
        BaseRequestHandle.setSuccess(HTTP_CODES.CREATED, 'OTP Verified');
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
  static async updatePassword(req: Request, res: Response) {
    const {new_password, old_password} = req.body;
    await AuthValidator.updatePassword(req.body, res, async () => {
      try {
        await UserService.updatePassword(req.user, old_password, new_password);
        BaseRequestHandle.setSuccess(
          HTTP_CODES.CREATED,
          'Password Updated Successfully'
        );
        return BaseRequestHandle.send(res);
      } catch (error) {
        BaseRequestHandle.setError(
          HTTP_CODES.BAD_REQUEST,
          `Invalid or Wrong Old Password`
        );
        return BaseRequestHandle.send(res);
      }
    });
  }
  static async forgetPassword(req: Request, res: Response) {
    await UserValidator.emailOrPhone(req.body, res, async () => {
      try {
        const user = await UserService.getByUnique({...req.body});
        if (user) {
          const token = await AuthService.forgetPassword(user as User);
          token.token = '';
          BaseRequestHandle.setSuccess(
            HTTP_CODES.CREATED,
            'An OTP Has Been Sent to Your Registered Phone Number',
            token
          );
          return BaseRequestHandle.send(res);
        }
        BaseRequestHandle.setError(
          HTTP_CODES.RESOURCE_NOT_FOUND,
          'User Not Found'
        );
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
  static async verifyResetPassword(req: Request, res: Response) {
    const {user_id, otp} = req.body;
    try {
      const verify = await AuthService.verifyResetPassword(user_id, otp);
      if (!verify) {
        BaseRequestHandle.setError(
          HTTP_CODES.BAD_REQUEST,
          'Invalid or Wrong OTP'
        );
        return BaseRequestHandle.send(res);
      }
      BaseRequestHandle.setSuccess(HTTP_CODES.CREATED, 'OTP Verified');
      return BaseRequestHandle.send(res);
    } catch (error) {
      BaseRequestHandle.setError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        `Internal Server Error. Contact Support.. : ${error}`
      );
      return BaseRequestHandle.send(res);
    }
  }
  static async confirmResetPassword(req: Request, res: Response) {
    const {user_id, new_password} = req.body;
    try {
      const [user, token] = await Promise.all([
        AuthService.confirmResetPassword(user_id, new_password),
        AuthService.findPasswordToken(user_id)
      ]);
      if (!token.isVerified && moment().isAfter(token.expires_at)) {
        BaseRequestHandle.setError(HTTP_CODES.BAD_REQUEST, 'Invalid OTP');
        return BaseRequestHandle.send(res);
      }
      if (!user) {
        BaseRequestHandle.setError(HTTP_CODES.BAD_REQUEST, 'User Not Found');
        return BaseRequestHandle.send(res);
      }
      BaseRequestHandle.setSuccess(
        HTTP_CODES.CREATED,
        'Password Updated Successfully'
      );
      return BaseRequestHandle.send(res);
    } catch (error) {
      BaseRequestHandle.setError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        `Internal Server Error. Contact Support.. : ${error}`
      );
      return BaseRequestHandle.send(res);
    }
  }
}
