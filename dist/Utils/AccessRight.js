"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma");
var AccessRight;
(function (AccessRight) {
    AccessRight[AccessRight["CREATE"] = 0] = "CREATE";
    AccessRight[AccessRight["READ"] = 1] = "READ";
    AccessRight[AccessRight["UPDATE"] = 2] = "UPDATE";
    AccessRight[AccessRight["DELETE"] = 3] = "DELETE";
})(AccessRight || (AccessRight = {}));
const roles = () => __awaiter(void 0, void 0, void 0, function* () { return (yield prisma_1.Prisma.role.findMany()).map(role => role.id); });
console.log(JSON.stringify(roles));
// enum ACL_ROLES {
//   SUPER_ADMIN = roles[0],
//   PATRON = artisan,
//   ARTISAN = ''
// }
//export {ACL_ROLES, AccessRight};
//# sourceMappingURL=AccessRight.js.map