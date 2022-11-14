import getJwtToken from '../Libs/jwt';
import {Response} from 'express';
import {IUser} from '../typings';

export default class Helper {
  static cookieToken(user: IUser, res: Response) {
    const token = getJwtToken(user.id);
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    };
    user.password = null;
    res.status(200).cookie('token', token, options).json({
      message: 'success',
      token,
      user
    });
  }
}
