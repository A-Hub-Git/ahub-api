"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACL_ROLES = exports.AccessRight = void 0;
var AccessRight;
(function (AccessRight) {
    AccessRight[AccessRight["CREATE"] = 0] = "CREATE";
    AccessRight[AccessRight["READ"] = 1] = "READ";
    AccessRight[AccessRight["UPDATE"] = 2] = "UPDATE";
    AccessRight[AccessRight["DELETE"] = 3] = "DELETE";
})(AccessRight = exports.AccessRight || (exports.AccessRight = {}));
var ACL_ROLES;
(function (ACL_ROLES) {
    ACL_ROLES[ACL_ROLES["SUPER_ADMIN"] = 0] = "SUPER_ADMIN";
    ACL_ROLES[ACL_ROLES["ARTISAN"] = 1] = "ARTISAN";
})(ACL_ROLES = exports.ACL_ROLES || (exports.ACL_ROLES = {}));
//# sourceMappingURL=AccessRigt.js.map