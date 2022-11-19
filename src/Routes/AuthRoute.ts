import router from 'express';
import {AuthController} from '../Controllers';

const Router = router.Router();

class AuthRoute {
  post() {
    Router.post('/login', AuthController.signIn);
  }
}

new AuthRoute().post();

export default Router;
