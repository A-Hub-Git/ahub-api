import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'ahub_secret';

export {JWT_SECRET};
