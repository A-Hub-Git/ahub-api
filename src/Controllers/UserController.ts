import {Prisma} from '../prisma';
import {Request, Response} from 'express';
import {HTTP_CODES, ResponseMessage} from './../Utils/ResponseCode';
import BaseRequestHandle from '../Server/BaseRequestHandle';
import {UserService} from '../Services';
import {Authorization, Logger} from '../Libs';
import {UserValidator} from '../Validators';

export default class UserController {
  static async createRole(req: Request, res: Response) {
    const data = req.body;
    try {
      Logger.info('Creating Role...');
      const roles = await UserService.getRoles();

      if (roles.length == 2) {
        BaseRequestHandle.setError(HTTP_CODES.BAD_REQUEST, 'Roles Exceeded');
        Logger.info('Roles Exceeded');
        return BaseRequestHandle.send(res);
      }
      const createdRole = await UserService.role(data);
      BaseRequestHandle.setSuccess(
        HTTP_CODES.CREATED,
        'Role created',
        createdRole
      );
      Logger.info('Role Created...');
      return BaseRequestHandle.send(res);
    } catch (error) {
      Logger.error('Error Creating Role...');
      BaseRequestHandle.setError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        ResponseMessage.INTERNAL_SERVER_ERROR
      );
      return BaseRequestHandle.send(res);
    }
  }
  static async getRoles(req: Request, res: Response) {
    try {
      const roles = await UserService.getRoles();
      BaseRequestHandle.setSuccess(HTTP_CODES.CREATED, 'Roles Received', roles);
      return BaseRequestHandle.send(res);
    } catch (error) {
      BaseRequestHandle.setError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        ResponseMessage.INTERNAL_SERVER_ERROR
      );
      return BaseRequestHandle.send(res);
    }
  }
  static async fetchUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      if (!users) {
        BaseRequestHandle.setSuccess(
          HTTP_CODES.RESOURCE_NOT_FOUND,
          'Users not received',
          users
        );
        return BaseRequestHandle.send(res);
      }
      BaseRequestHandle.setSuccess(HTTP_CODES.OK, 'users received', users);
      return BaseRequestHandle.send(res);
    } catch (error) {
      BaseRequestHandle.setError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        ResponseMessage.INTERNAL_SERVER_ERROR
      );
      return BaseRequestHandle.send(res);
    }
  }
  static async createUser(req: Request, res: Response) {
    const data = req.body;
    const user = data.role;
    await UserValidator.createAccount(data, res, async () => {
      try {
        const role = await Prisma.role.findMany();
        Logger.info(`Creating ${data.role}...`);
        data.roleId = data.role === 'Patron' ? role[0].id : role[1].id;
        delete data.role;
        data.location = JSON.parse(data.location);
        data.password = await Authorization.createHash(data.password);
        const createdUser = await UserService.create(data);
        Logger.info(`${user} Created Successfully😅`);
        BaseRequestHandle.setSuccess(
          HTTP_CODES.CREATED,
          `${user} Created Successfully`,
          createdUser
        );
        return BaseRequestHandle.send(res);
      } catch (error) {
        Logger.error(`Error creating ${user} : ${JSON.stringify(error)}  😠`);
        BaseRequestHandle.setError(
          HTTP_CODES.INTERNAL_SERVER_ERROR,
          `${ResponseMessage.INTERNAL_SERVER_ERROR + error}`
        );
        return BaseRequestHandle.send(res);
      }
    });
  }
}
