import {Prisma, Task, TaskAssignment} from '../prisma';

export default class TaskService {
  static async createTask(data: Task) {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await Prisma.task.create({data});
        resolve(task);
      } catch (error) {
        reject(error);
      }
    });
  }
  static async findUnique(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await Prisma.task.findUnique({where: {id}});
        resolve(task);
      } catch (error) {
        reject(error);
      }
    });
  }
  static async findPatronTasks(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await Prisma.user.findUnique({
          where: {id},
          include: {tasks: true, TaskAssignment: true}
        });
        resolve(task);
      } catch (error) {
        reject(error);
      }
    });
  }
  static async createTaskAssign(data: TaskAssignment) {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await Prisma.taskAssignment.create({data});
        resolve(task);
      } catch (error) {
        reject(error);
      }
    });
  }
}
