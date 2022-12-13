import router from 'express';
import {UserController} from '../Controllers';

const Router = router.Router();
class UserRouter {
  get() {
    Router.get('/', UserController.fetchUsers);
  }
  post() {
    Router.post('/', UserController.createUser);
    Router.post('/wait-list', UserController.joinWaitList);
  }
}

new UserRouter().get();
new UserRouter().post();

export default Router;
