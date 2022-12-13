import dotenv from 'dotenv';
dotenv.config();

const pubNubConfig = {
  PUBLISH_KEY: process.env.PUBLISH_KEY,
  SUBSCRIBE_KEY: process.env.SUBSCRIBE_KEY as string
};

export default pubNubConfig;
