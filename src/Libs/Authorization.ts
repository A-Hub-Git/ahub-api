import {HTTP_CODES} from './../Utils/ResponseCode';
import {NextFunction, Request, Response} from 'express';
import {Prisma, User} from '../prisma';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import {JWT_SECRET} from '../config';
import BaseRequestHandle from '../Server/BaseRequestHandle';

dotenv.config();
export default class Authorization {
  static async cookieToken(user: User | any, res: Response) {
    const token = await this.getJwtToken(user);
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    };
    user.password = '';

    res.status(200).cookie('token', token, options).json({
      message: 'Login Successful.',
      data: {user, token}
    });
  }
  static VerifyUserToken =
    (roleIds: any[]) => (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization?.split(' ')[1];
        jwt.verify(
          token as string,
          process.env.JWT_SECRET as string,
          async (error: unknown, payload: any) => {
            if (error) {
              BaseRequestHandle.setError(
                HTTP_CODES.UNAUTHORIZED,
                'Unauthorized. Token Invalid'
              );
              return BaseRequestHandle.send(res);
            }
            const user = await Prisma.user.findUnique({
              where: {id: payload.userId}
            });
            if (!user) {
              BaseRequestHandle.setError(
                HTTP_CODES.UNAUTHORIZED,
                'Unauthorized. User does not exist in our system'
              );
              return BaseRequestHandle.send(res);
            }
            if (
              user &&
              roleIds &&
              roleIds.length &&
              !roleIds.includes(user.roleId)
            ) {
              BaseRequestHandle.setError(
                HTTP_CODES.BAD_REQUEST,
                'Access Denied, Unauthorized Access'
              );
              return BaseRequestHandle.send(res);
            }
            req.user = user;
          }
        );
      } catch (error) {
        BaseRequestHandle.setError(
          HTTP_CODES.UNAUTHORIZED,
          'Unauthorized. Token Invalid'
        );
        return BaseRequestHandle.send(res);
      }
    };

  static async getJwtToken(user: any) {
    return jwt.sign({user}, JWT_SECRET, {expiresIn: '1 day'});
  }
  static async createHash(hash: any) {
    return bcrypt.hashSync(hash, 10);
  }
  static async compareHash(value: string, hash: string) {
    return bcrypt.hashSync(value, hash);
  }
}
