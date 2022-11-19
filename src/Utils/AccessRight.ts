import {Prisma} from '../prisma';
enum AccessRight {
  CREATE,
  READ,
  UPDATE,
  DELETE
}

enum ACL_ROLES {
  PATRON = 1,
  ARTISAN = 2
}

export {ACL_ROLES, AccessRight};
