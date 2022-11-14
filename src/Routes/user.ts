import router from 'express';
import {UserController} from '../Controllers';

const Router = router.Router();

Router.get('/', UserController.fetchUsers).post('/', UserController.createUser);

export default Router;
