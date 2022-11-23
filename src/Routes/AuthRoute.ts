import router from 'express';
import {AuthController} from '../Controllers';
import {AuthMiddleware} from '../Middleware';

const Router = router.Router();

class AuthRoute {
  post() {
    Router.post('/login', AuthController.signIn);
    Router.post('/resend-otp/:user_id', AuthController.resendOtp);
    Router.post(
      '/verify-otp/:otp',
      AuthMiddleware.ArtisanPatronAccess,
      AuthController.verify_otp
    );
  }
}

new AuthRoute().post();

export default Router;
