import {PrismaClient} from '@prisma/client';
import {IRole, IUser} from '../typings';
import BaseRequestHandler from 'Server/BaseRequestHandle';

const prisma = new PrismaClient();
export default class UserService {
  static async role(data: IRole) {
    return await prisma.role.create({data});
  }
  static async getRoles() {
    return await prisma.role.findMany();
  }
  static async create(data: any) {
    return await prisma.user.create({data});
  }
  static async getUsers() {
    return await prisma.user.findMany();
  }
  static async getById() {
    //return await prisma.user.findOne();
  }
}
