import {Prisma} from '../prisma';
enum AccessRight {
  CREATE,
  READ,
  UPDATE,
  DELETE
}

const roles: any = async () =>
  (await Prisma.role.findMany()).map(role => role.id);

enum ACL_ROLES {
  ARTISAN = roles[0].id,
  PATRON = roles[1].id
}

export {ACL_ROLES, AccessRight};
