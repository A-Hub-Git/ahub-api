import router from 'express';
import {UserValidator} from '../Validators';
import {UserController} from '../Controllers';

const Router = router.Router();
class UserRouter {
  get() {
    Router.get('/', UserController.fetchUsers);
  }
  post() {
    Router.post('/', UserController.createUser);
  }
}

new UserRouter().get();
new UserRouter().post();

export default Router;
