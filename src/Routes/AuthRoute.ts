import router from 'express';
import {AuthController} from '../Controllers';

const Router = router.Router();

class AuthRoute {
  post() {
    Router.post('/login', AuthController.signIn);
    Router.post('/resend-otp/:user_id', AuthController.resendOtp);
  }
}

new AuthRoute().post();

export default Router;
