import router from 'express';
import {AuthController} from '../Controllers';
import {AuthMiddleware} from '../Middleware';

const Router = router.Router();

class AuthRoute {
  post() {
    Router.post('/login', AuthController.signIn); // Route to SignIn to Your Account

    Router.post(
      '/resend-otp',
      AuthMiddleware.ArtisanPatronAccess,
      AuthController.resendOtp
    ); // Route to Resend an OTP if Not Received

    Router.post(
      '/verify-otp/:otp',
      AuthMiddleware.ArtisanPatronAccess,
      AuthController.verify_otp
    ); // Route to Verify OTP
    Router.post(
      '/update-password',
      AuthMiddleware.FullAccess,
      AuthController.updatePassword
    ); //Route to Update Password
    Router.post('/forgot-password', AuthController.forgetPassword);
    Router.post('/verify-password-otp', AuthController.verifyResetPassword);
    Router.post('/confirm-reset-password', AuthController.confirmResetPassword);
  }
}

new AuthRoute().post();

export default Router;
