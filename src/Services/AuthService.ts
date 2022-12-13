import {QueueService} from '../Services';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import {Prisma, PasswordResetToken} from '../prisma';
import String from '../Utils/String';
import {User} from '../prisma';
import Authorization from '../Authorization/Authorization';
import UserService from './UserService';
import CommunicationService from './SMSService';

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
  static async forgetPassword({
    id: userId,
    phone
  }: User): Promise<PasswordResetToken> {
    return new Promise(async (resolve, reject) => {
      const expires_at = moment().add(10, 'm').toDate();
      const token = Authorization.createHash('1234');

      try {
        const isPasswordToken = await this.findPasswordToken(userId);

        if (!isPasswordToken) {
          await QueueService.sendOTP(phone, '', userId);
          const created = await this.createPasswordToken({
            token,
            userId,
            expires_at
          } as PasswordResetToken);
          return resolve(created as PasswordResetToken);
        }
        await QueueService.sendOTP(phone, '', userId);
        return resolve(
          await this.updatePasswordToken(userId, {
            expires_at,
            token
          } as PasswordResetToken)
        );
      } catch (error) {
        return reject(error);
      }
    });
  }
  static verifyResetPassword(userId: string, token: string) {
    return new Promise(async (resolve, reject) => {
      const user = await this.findPasswordToken(userId);
      try {
        if (
          user &&
          Authorization.compareHash(token, user.token) &&
          moment().isBefore(user.expires_at)
        ) {
          const verified = await this.updatePasswordToken(userId, {
            isVerified: true
          } as PasswordResetToken);
          verified.token = '';
          return resolve(verified);
        }
        return resolve(false);
      } catch (error) {
        reject(error);
      }
    });
  }
  static confirmResetPassword(id: string, newPassword: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const password = Authorization.createHash(newPassword);
        await UserService.update({id}, {password} as User);
        await this.updatePasswordToken(id, {
          isVerified: false
        } as PasswordResetToken);
        return resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
  static createPasswordToken(data: PasswordResetToken) {
    return new Promise(async (resolve, reject) => {
      try {
        const password_token = await Prisma.passwordResetToken.create({data});
        password_token.token = '';
        return resolve(password_token);
      } catch (error) {
        reject(error);
      }
    });
  }
  static updatePasswordToken(
    userId: string,
    data: PasswordResetToken
  ): Promise<PasswordResetToken> {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await this.findPasswordToken(userId);
        const password_token = await Prisma.passwordResetToken.update({
          where: {id: token.id} as PasswordResetToken,
          data
        });

        return resolve(password_token);
      } catch (error) {
        reject(error);
      }
    });
  }
  static async findPasswordToken(userId: string): Promise<PasswordResetToken> {
    return new Promise(async (resolve, reject) => {
      try {
        const password_token = await Prisma.passwordResetToken.findFirst({
          where: {userId}
        });
        return resolve(password_token as PasswordResetToken);
      } catch (error) {
        reject(error);
      }
    });
  }
  static updatePassword(data: User, newPassword: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await UserService.update({data}, {
          password: newPassword
        } as User);
        if (user) return resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
}
