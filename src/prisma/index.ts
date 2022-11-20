import {PrismaClient, User, Role, VerificationToken} from '@prisma/client';
const Prisma = new PrismaClient();

export {Prisma, User, Role, VerificationToken};
