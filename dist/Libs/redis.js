"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const store = (0, redis_1.createClient)({
    url: process.env.REDIS_URL
});
exports.default = store;
//A4abjy5t6c1km25dsca15vnwlbxukexrqn8lgemltb46ikn6gcx;
//# sourceMappingURL=redis.js.map