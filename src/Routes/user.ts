import router from 'express';
import {UserValidator} from '../Validators';
import {UserController} from '../Controllers';
import BaseValidator from '../Validators/BaseValidator';

const Router = router.Router();
Router.post('/', UserController.createUser);
Router.route('/').get(UserController.fetchUsers);

export default Router;
