import {HTTP_CODES} from '../Utils';
import BaseRequestHandle from '../Utils/BaseRequestHandle';
import {Response, Request} from 'express';
import TaskService from '../Services/TaskService';
import TaskValidator from '../Validators/TaskValidator';
import {Logger} from '../Libs';

export default class TaskController {
  static async createTask(req: Request, res: Response) {
    req.body.patron_id = req.user.id;
    req.body.is_fragile = Boolean(req.body.is_fragile);
    req.body.weightKg = Number(req.body.weightKg);
    req.body.amount = Number(req.body.amount);
    await TaskValidator.addTask(req.body, res, async () => {
      try {
        const task = await TaskService.createTask(req.body);
        BaseRequestHandle.setSuccess(
          HTTP_CODES.CREATED,
          'Task created successfully',
          task
        );
        Logger.info('Task added successfully');
        return BaseRequestHandle.send(res);
      } catch (error) {
        Logger.error(`Error adding task: ${error}`);
        BaseRequestHandle.setError(
          HTTP_CODES.INTERNAL_SERVER_ERROR,
          'Internal Server Error..'
        );
        return BaseRequestHandle.send(res);
      }
    });
  }

  static async acceptTask(req: Request, res: Response) {
    req.body.rider_id = req.user.id;
    req.body.status = 'in_progress';
    await TaskValidator.acceptTask(req.body, res, async () => {
      try {
        const task = await TaskService.findUnique(req.body.task_id);
        if (!task) {
          BaseRequestHandle.setError(
            HTTP_CODES.RESOURCE_NOT_FOUND,
            'Task not found'
          );
          return BaseRequestHandle.send(res);
        }
        const accept = await TaskService.createTaskAssign(req.body);
        BaseRequestHandle.setSuccess(
          HTTP_CODES.CREATED,
          'task accepted successfully',
          accept
        );
        return BaseRequestHandle.send(res);
      } catch (error: any) {
        BaseRequestHandle.setError(
          HTTP_CODES.INTERNAL_SERVER_ERROR + error,
          'Internal Server Error..'
        );
        return BaseRequestHandle.send(res);
      }
    });
  }
  static async patronTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskService.findPatronTasks(req.user.id);
      BaseRequestHandle.setSuccess(HTTP_CODES.CREATED, 'task received', tasks);
      return BaseRequestHandle.send(res);
    } catch (error: any) {
      Logger.error(`Error fetch patron tasks: ${error}`);
      BaseRequestHandle.setError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        'Internal Server Error..'
      );
      return BaseRequestHandle.send(res);
    }
  }
}
