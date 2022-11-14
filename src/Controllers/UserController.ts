import {Request, Response} from 'express';
import {HTTP_CODES, ResponseMessage} from './../Utils/ResponseCode';
import BaseRequestHandle from '../Server/BaseRequestHandle';
import {UserService} from '../Services';
import {Redis} from '../Libs';

export default class UserController {
  static async createRole(req: Request, res: Response) {
    const data = req.body;
    try {
      const createdRole = await UserService.role(data);
      BaseRequestHandle.setSuccess(
        HTTP_CODES.CREATED,
        'Role created',
        createdRole
      );
      return BaseRequestHandle.send(res);
    } catch (error) {
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
    try {
      data.roleId =
        data.user_type === 'patron'
          ? '6371aae9667890da539ae46c'
          : '6371ad91b58dd5a52051907d';
      delete data.user_type;

      const createdUser = await UserService.create(data);
      BaseRequestHandle.setSuccess(
        HTTP_CODES.CREATED,
        ResponseMessage.CREATED,
        createdUser
      );
      return BaseRequestHandle.send(res);
    } catch (error) {
      BaseRequestHandle.setError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        `${ResponseMessage.INTERNAL_SERVER_ERROR + error}`
      );
      return BaseRequestHandle.send(res);
    }
  }
}
