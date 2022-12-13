"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp_ts_1 = require("@droidsolutions-oss/amqp-ts");
require('dotenv').config();
exports.default = new amqp_ts_1.Connection(`amqp://${process.env.RABBIT_HOST}`);
//# sourceMappingURL=rabbitMq.js.map