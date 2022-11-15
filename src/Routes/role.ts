import router from 'express';
import {UserController} from '../Controllers';

const Router = router.Router();

Router.route('/').get(UserController.getRoles).post(UserController.createRole);

export default Router;
