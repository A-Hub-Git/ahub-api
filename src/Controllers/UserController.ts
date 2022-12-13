import {Prisma} from '../prisma';
import {Request, Response} from 'express';
import {HTTP_CODES, ResponseMessage} from '../Utils/Enum';
import BaseRequestHandle from '../Utils/BaseRequestHandle';
import {UserService} from '../Services';
import Authorization from '../Authorization/Authorization';
import {Logger} from '../Libs';
import {UserValidator} from '../Validators';
import {ACL_ROLES} from '../Utils';

export default class UserController {
  static async createRole(req: Request, res: Response) {
    const data = req.body;
    try {
      Logger.info('Creating Role...');
      const roles = await UserService.getRoles();

      if (roles?.length == 2) {
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
        const user = await Prisma.user.findUnique({
          where: {email: req.body.email}
        });
        if (user) {
          BaseRequestHandle.setError(
            HTTP_CODES.CONFLICT,
            `Email already taken`
          );
          return BaseRequestHandle.send(res);
        }
        Logger.info(`Registering ${data.role}... 🏃‍♂️`);
        data.roleId =
          data.role === 'Patron' ? ACL_ROLES.PATRON : ACL_ROLES.ARTISAN;
        delete data.role;
        data.password = data.password
          ? Authorization.createHash(data.password)
          : '';
        const createdUser = await UserService.create(data);
        Logger.info(`${user} Registered Successfully😅`);
        BaseRequestHandle.setSuccess(
          HTTP_CODES.CREATED,
          `${user} Registered Successfully`,
          createdUser
        );
        return BaseRequestHandle.send(res);
      } catch (error) {
        Logger.error(
          `Error Registering ${user} : ${JSON.stringify(error)}  😠`
        );
        BaseRequestHandle.setError(
          HTTP_CODES.INTERNAL_SERVER_ERROR,
          `${ResponseMessage.INTERNAL_SERVER_ERROR + error}`
        );
        return BaseRequestHandle.send(res);
      }
    });
  }
  static async joinWaitList(req: Request, res: Response) {
    await UserValidator.joinWaitList(req.body, res, async () => {
      try {
        const user = await Prisma.user.findUnique({
          where: {email: req.body.email}
        });
        if (user) {
          BaseRequestHandle.setError(
            HTTP_CODES.CONFLICT,
            `You are already in our wait list`
          );
          return BaseRequestHandle.send(res);
        }
        const is_joined = await UserService.joinWaitList(req.body.email);
        BaseRequestHandle.setSuccess(
          HTTP_CODES.CREATED,
          'Hi there, Thank you for your interest in our services, we will keep you in touch with all relevant update to our services and coverage.A-hub Team ',
          is_joined
        );
        return BaseRequestHandle.send(res);
      } catch (error) {
        BaseRequestHandle.setError(
          HTTP_CODES.INTERNAL_SERVER_ERROR,
          ResponseMessage.INTERNAL_SERVER_ERROR
        );
        return BaseRequestHandle.send(res);
      }
    });
  }
}
