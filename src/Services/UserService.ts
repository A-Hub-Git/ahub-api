import Cache from '../Utils/BaseCache';
import {Logger} from '../Libs';
import {Prisma, User, Role} from '../prisma';
import SMSService from './SMSService';
import Authorization from '../Authorization/Authorization';
import QueueService from './QueueService';
import {wait_list} from '../File';
import MailerService from './MailerService';

export default class UserService extends Authorization {
  static async role(data: Role) {
    const role = await Prisma.role.findMany();
    data.roleId = role.length + 1;
    return await Prisma.role.create({data});
  }
  static async create(data: User) {
    const user = await Prisma.user.create({data});
    await SMSService.sendOtp(
      user.phone as string,
      'An OTP to verify your account',
      user.id
    );

    return user;
  }
  static async getRoles() {
    try {
      // const roles = await Cache('roles', async () => {
      const data = await Prisma.role.findMany();
      return data;
      // });
      // return roles as any;
    } catch (error) {
      Logger.error(`Error fetching role (REDIS..): ${error}`);
    }
  }

  static async getUsers() {
    const users = await Cache.baseCache('users', async () => {
      const fresh_users = await Prisma.user.findMany();
      return fresh_users;
    });

    return users;
  }
  static async getByUnique(clause: object) {
    return new Promise(async (resolve, reject) => {
      try {
        let where = {
          ...clause
        };
        const user = await Prisma.user.findUnique({where});
        return resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
  static async update(clause: object, data: User) {
    return new Promise(async (resolve, reject) => {
      try {
        let where = {
          ...clause
        };
        const user = await Prisma.user.update({
          where,
          data
        });

        return resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
  static async updatePassword(
    user: User,
    oldPassword: string,
    newPassword: string
  ) {
    return new Promise((resolve, reject) => {
      try {
        const isOldPassword = this.compareHash(
          oldPassword,
          user.password as string
        );
        if (!isOldPassword) return reject(false);

        const password = Authorization.createHash(newPassword);
        const updatedPassword = Prisma.user.update({
          where: {id: user.id},
          data: {password}
        });
        return resolve(updatedPassword);
      } catch (error) {
        reject(error);
      }
    });
  }
  static joinWaitList(email: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const join = await Prisma.user.create({data: {email}});
        await MailerService._sendMail(email, 'Wait List', wait_list);
        resolve(join);
      } catch (error) {
        reject(error);
      }
    });
  }
}
