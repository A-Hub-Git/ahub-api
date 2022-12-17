"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma");
class TaskService {
    static createTask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // const task = await Prisma.task.create({data});
                    // resolve(task);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    static findUnique(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const task = yield prisma_1.Prisma.task.findUnique({ where: { id } });
                    resolve(task);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    static findPatronTasks(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const task = yield prisma_1.Prisma.user.findUnique({
                        where: { id },
                        include: { tasks: true, TaskAssignment: true }
                    });
                    resolve(task);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    static createTaskAssign(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const task = yield prisma_1.Prisma.taskAssignment.create({ data });
                    resolve(task);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
}
exports.default = TaskService;
//# sourceMappingURL=TaskService.js.map