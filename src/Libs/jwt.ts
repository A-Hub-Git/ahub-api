import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config';

const getJwtToken = (userId: string) => {
  return jwt.sign({userId}, JWT_SECRET, {expiresIn: '1 day'});
};

export default getJwtToken;
