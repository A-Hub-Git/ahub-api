import router from 'express';
import {UserController} from '../Controllers';

const Router = router.Router();
class AdminRouter {
  get() {
    Router.get('/', UserController.fetchUsers);
  }
  post() {}
}

new AdminRouter().get();
new AdminRouter().post();

export default Router;
