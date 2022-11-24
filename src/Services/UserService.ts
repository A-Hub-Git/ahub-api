import Cache from '../Utils/BaseCache';
import {Logger} from '../Libs';
import {Prisma, User, Role} from '../prisma';
import CommunicationService from './CommunicationService';

export default class UserService extends CommunicationService {
  static async role(data: Role) {
    const role = await Prisma.role.findMany();
    data.roleId = role.length + 1;
    return await Prisma.role.create({data});
  }
  static async create(data: User) {
    const user = await Prisma.user.create({data});
    const sms = await this.sendSms(user.phone, user.id);

    return {user, sms};
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
  static async getByUnique() {
    return await Prisma.user.findUnique({where: {}});
  }
}
