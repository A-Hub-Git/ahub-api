import router from 'express';
import {AuthMiddleware} from '../Middleware';
import {TaskController} from '../Controllers';

const Router = router.Router();
class TaskRouter {
  get() {
    Router.get(
      '/patron',
      AuthMiddleware.PatronAccess,
      TaskController.patronTasks
    );
  }
  post() {
    Router.post('/', AuthMiddleware.PatronAccess, TaskController.createTask);
    Router.post(
      '/accept',
      AuthMiddleware.ArtisanAccess,
      TaskController.acceptTask
    );
  }
}

new TaskRouter().get();
new TaskRouter().post();

export default Router;
