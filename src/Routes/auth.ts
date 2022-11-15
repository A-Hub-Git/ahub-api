import router from 'express';
import {AuthController} from '../Controllers';

const Router = router.Router();

Router.post('/login', AuthController.signIn);

export default Router;
