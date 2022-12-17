import router from 'express';
import {AuthMiddleware} from '../Middleware';
import {MailController} from '../Controllers';

const Router = router.Router();
class MailRouter {
  get() {}
  post() {
    Router.post('/', MailController.sendUsMail);
  }
}

new MailRouter().get();
new MailRouter().post();

export default Router;
