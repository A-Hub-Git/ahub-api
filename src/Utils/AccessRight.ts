enum AccessRight {
  CREATE,
  READ,
  UPDATE,
  DELETE
}

enum ACL_ROLES {
  SUPER_ADMIN = 1,
  PATRON = 2,
  ARTISAN = 3
}

export {ACL_ROLES, AccessRight};
