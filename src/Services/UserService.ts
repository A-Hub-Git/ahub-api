import Cache from '../Utils/chache';
import {Logger} from '../Libs';
import Redis from '../Libs/redis';
import {Prisma, User, Role} from '../prisma';

export default class UserService {
  static async role(data: Role) {
    return await Prisma.role.create({data});
  }
  static async create(data: User) {
    return await Prisma.user.create({data});
  }
  static async getRoles() {
    try {
      const roles = await Cache('roles', async () => {
        const data = await Prisma.role.findMany();
        return data;
      });
      return roles as any;
    } catch (error) {
      Logger.error(`Error fetching role (REDIS..): ${error}`);
    }
  }

  static async getUsers() {
    const cachedUsers = await Redis.get('users');
    if (cachedUsers) {
      return JSON.parse(cachedUsers);
    }
    const dbUsers = await Prisma.user.findMany();
    Redis.setEx('users', 3600, JSON.stringify(dbUsers));
    return dbUsers;
  }
  static async getByUnique() {
    return await Prisma.user.findUnique({where: {}});
  }
}
