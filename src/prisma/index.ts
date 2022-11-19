import {PrismaClient, User, Role, VerificationToken} from '@prisma/client';
import {Logger} from '../Libs';
const Prisma = new PrismaClient();
Prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  Logger.info(
    `Query ${params.model}.${params.action} took ${after - before}ms`
  );
  return result;
});
export {Prisma, User, Role, VerificationToken};
