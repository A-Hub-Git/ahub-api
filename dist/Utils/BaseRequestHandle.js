"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class BaseRequestHandler {
    constructor() {
        this.statusCode = 200;
        this.type = null;
        this.data = null;
        this.message = null;
    }
    setSuccess(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.type = _1.ResponseStatus.SUCCESS;
    }
    setError(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
        this.type = _1.ResponseStatus.FAILURE;
    }
    send(res) {
        let result;
        if (this.type === _1.ResponseStatus.SUCCESS) {
            result = {
                code: this.statusCode,
                status: this.type,
                message: this.message,
                data: this.data
            };
        }
        else {
            result = {
                code: this.statusCode,
                status: this.type,
                message: this.message
            };
        }
        return res.status(result.code).json(result);
    }
}
exports.default = new BaseRequestHandler();
//# sourceMappingURL=BaseRequestHandle.js.map