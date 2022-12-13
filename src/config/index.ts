import mongoConfig from './mongo';
import sinchConfig from './sinch';
import pubNubConfig from './pubnub';
import termiiConfig from './termii';
import mailerConfig from './mail';
import {redisConfig} from './redis';
import {JWT_SECRET} from './middleware';

export {
  mongoConfig,
  redisConfig,
  JWT_SECRET,
  sinchConfig,
  pubNubConfig,
  termiiConfig,
  mailerConfig
};
