import {HTTP_CODES} from '../Utils/Enum';
import {NextFunction, Request, Response} from 'express';
import {Prisma, User} from '../prisma';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import {JWT_SECRET} from '../config';
import BaseRequestHandle from '../Utils/BaseRequestHandle';

dotenv.config();
export default class Authorization {
  static async cookieToken(user: User | any, res: Response) {
    const token = await this.getJwtToken(user);
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    };
    user.password = '';
    user.token = token;
    res.status(200).json({
      message: 'Login Successful.',
      data: user
    });
  }
  static VerifyUserToken =
    (roleIds: number[]) =>
    (req: Request, res: Response, next: NextFunction) => {
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
            const user = await Prisma.user.findFirst({
              where: {id: payload.user.id}
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
            next();
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
  static createHash(value: any) {
    return bcrypt.hashSync(value, 10);
  }
  static compareHash(value: string, hash: string) {
    return bcrypt.compareSync(value, hash);
  }
}
