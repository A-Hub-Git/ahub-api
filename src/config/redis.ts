import dotenv from 'dotenv';
dotenv.config();

const redisConfig = {
  REDIS_URL: process.env.REDIS_URL || 'redis',
  REDIS_USERNAME: process.env.REDIS_USERNAME || 'ahub_jibril',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || ''
};

export {redisConfig};
