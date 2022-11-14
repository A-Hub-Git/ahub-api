"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessRight = exports.ACL_ROLES = void 0;
var AccessRight;
(function (AccessRight) {
    AccessRight[AccessRight["CREATE"] = 0] = "CREATE";
    AccessRight[AccessRight["READ"] = 1] = "READ";
    AccessRight[AccessRight["UPDATE"] = 2] = "UPDATE";
    AccessRight[AccessRight["DELETE"] = 3] = "DELETE";
})(AccessRight || (AccessRight = {}));
exports.AccessRight = AccessRight;
var ACL_ROLES;
(function (ACL_ROLES) {
    ACL_ROLES[ACL_ROLES["SUPER_ADMIN"] = 1] = "SUPER_ADMIN";
    ACL_ROLES[ACL_ROLES["PATRON"] = 2] = "PATRON";
    ACL_ROLES[ACL_ROLES["ARTISAN"] = 3] = "ARTISAN";
})(ACL_ROLES || (ACL_ROLES = {}));
exports.ACL_ROLES = ACL_ROLES;
//# sourceMappingURL=AccessRight.js.map