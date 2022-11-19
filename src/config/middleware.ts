import dotenv from 'dotenv';
dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';
const JWT_SECRET = process.env.JWT_SECRET || 'ahub_secret';

export {REDIS_URL, REDIS_PORT, JWT_SECRET, REDIS_PASSWORD};
