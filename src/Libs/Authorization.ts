import {Response} from 'express';
import {User} from '../prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {JWT_SECRET} from '../config';

export default class Authorization {
  static async cookieToken(user: User, res: Response) {
    const token = this.getJwtToken(user.id);
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    };
    user.password = '';

    res.status(200).cookie('token', token, options).json({
      message: 'Login Successful.',
      token,
      user
    });
  }
  static async getJwtToken(userId: string) {
    return jwt.sign({userId}, JWT_SECRET, {expiresIn: '1 day'});
  }
  static async createHash(hash: string) {
    return bcrypt.hashSync(hash, 10);
  }
  static async compareHash(value: string, hash: string) {
    return bcrypt.hashSync(value, hash);
  }
}
