import {
  PrismaClient,
  User,
  Role,
  VerificationToken,
  PasswordResetToken
} from '@prisma/client';
const Prisma = new PrismaClient();

export {Prisma, User, Role, VerificationToken, PasswordResetToken};
