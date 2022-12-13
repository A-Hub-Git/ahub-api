"use strict";
require('dotenv').config();
module.exports = {
    connectionURL: `amqp://${process.env.RABBIT_HOST}`
};
//# sourceMappingURL=rabbitMq.js.map