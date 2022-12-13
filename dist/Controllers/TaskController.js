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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../Utils");
const BaseRequestHandle_1 = __importDefault(require("../Utils/BaseRequestHandle"));
const TaskService_1 = __importDefault(require("../Services/TaskService"));
const TaskValidator_1 = __importDefault(require("../Validators/TaskValidator"));
const Libs_1 = require("../Libs");
class TaskController {
    static createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.patron_id = req.user.id;
            req.body.is_fragile = Boolean(req.body.is_fragile);
            req.body.weightKg = Number(req.body.weightKg);
            req.body.amount = Number(req.body.amount);
            yield TaskValidator_1.default.addTask(req.body, res, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const task = yield TaskService_1.default.createTask(req.body);
                    BaseRequestHandle_1.default.setSuccess(Utils_1.HTTP_CODES.CREATED, 'Task created successfully', task);
                    Libs_1.Logger.info('Task added successfully');
                    return BaseRequestHandle_1.default.send(res);
                }
                catch (error) {
                    Libs_1.Logger.error(`Error adding task: ${error}`);
                    BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.INTERNAL_SERVER_ERROR, 'Internal Server Error..');
                    return BaseRequestHandle_1.default.send(res);
                }
            }));
        });
    }
    static acceptTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.rider_id = req.user.id;
            req.body.status = 'in_progress';
            yield TaskValidator_1.default.acceptTask(req.body, res, () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const task = yield TaskService_1.default.findUnique(req.body.task_id);
                    if (!task) {
                        BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.RESOURCE_NOT_FOUND, 'Task not found');
                        return BaseRequestHandle_1.default.send(res);
                    }
                    const accept = yield TaskService_1.default.createTaskAssign(req.body);
                    BaseRequestHandle_1.default.setSuccess(Utils_1.HTTP_CODES.CREATED, 'task accepted successfully', accept);
                    return BaseRequestHandle_1.default.send(res);
                }
                catch (error) {
                    BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.INTERNAL_SERVER_ERROR + error, 'Internal Server Error..');
                    return BaseRequestHandle_1.default.send(res);
                }
            }));
        });
    }
    static patronTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield TaskService_1.default.findPatronTasks(req.user.id);
                BaseRequestHandle_1.default.setSuccess(Utils_1.HTTP_CODES.CREATED, 'task received', tasks);
                return BaseRequestHandle_1.default.send(res);
            }
            catch (error) {
                Libs_1.Logger.error(`Error fetch patron tasks: ${error}`);
                BaseRequestHandle_1.default.setError(Utils_1.HTTP_CODES.INTERNAL_SERVER_ERROR, 'Internal Server Error..');
                return BaseRequestHandle_1.default.send(res);
            }
        });
    }
}
exports.default = TaskController;
//# sourceMappingURL=TaskController.js.map