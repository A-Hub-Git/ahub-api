import {Connection} from '@droidsolutions-oss/amqp-ts';
require('dotenv').config();
export default new Connection(`amqp://${process.env.RABBIT_HOST}`);
