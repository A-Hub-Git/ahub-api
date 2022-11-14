"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_env = {
    MONGO_IP: process.env.MONGO_IP || 'mongo',
    MONGO_PORT: process.env.MONGO_PORT || '27017',
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD
};
exports.default = mongo_env;
//# sourceMappingURL=mongo.js.map