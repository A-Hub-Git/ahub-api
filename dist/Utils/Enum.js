"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACL_ROLES = exports.HTTP_METHODS = exports.ResponseStatus = exports.ResponseMessage = exports.HTTP_CODES = void 0;
var HTTP_CODES;
(function (HTTP_CODES) {
    HTTP_CODES[HTTP_CODES["OK"] = 200] = "OK";
    HTTP_CODES[HTTP_CODES["CREATED"] = 201] = "CREATED";
    HTTP_CODES[HTTP_CODES["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP_CODES[HTTP_CODES["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTP_CODES[HTTP_CODES["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTP_CODES[HTTP_CODES["RESOURCE_NOT_FOUND"] = 404] = "RESOURCE_NOT_FOUND";
    HTTP_CODES[HTTP_CODES["UN_PROCESSABLE_ENTITY"] = 422] = "UN_PROCESSABLE_ENTITY";
    HTTP_CODES[HTTP_CODES["CONFLICT"] = 409] = "CONFLICT";
    HTTP_CODES[HTTP_CODES["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HTTP_CODES = exports.HTTP_CODES || (exports.HTTP_CODES = {}));
var ResponseMessage;
(function (ResponseMessage) {
    ResponseMessage["OK"] = "success";
    ResponseMessage["CREATED"] = "success";
    ResponseMessage["INTERNAL_SERVER_ERROR"] = "Internal Server Error. Contact Support!..";
})(ResponseMessage = exports.ResponseMessage || (exports.ResponseMessage = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["SUCCESS"] = "success";
    ResponseStatus["FAILURE"] = "error";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
var HTTP_METHODS;
(function (HTTP_METHODS) {
    HTTP_METHODS["GET"] = "GET";
    HTTP_METHODS["POST"] = "POST";
    HTTP_METHODS["PUT"] = "PUT";
    HTTP_METHODS["DELETE"] = "DELETE";
    HTTP_METHODS["OPTIONS"] = "OPTIONS";
})(HTTP_METHODS = exports.HTTP_METHODS || (exports.HTTP_METHODS = {}));
var ACL_ROLES;
(function (ACL_ROLES) {
    ACL_ROLES[ACL_ROLES["ARTISAN"] = 1] = "ARTISAN";
    ACL_ROLES[ACL_ROLES["PATRON"] = 2] = "PATRON";
})(ACL_ROLES = exports.ACL_ROLES || (exports.ACL_ROLES = {}));
//# sourceMappingURL=Enum.js.map