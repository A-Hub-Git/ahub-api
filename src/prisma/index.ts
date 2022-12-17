import {
  ZohoToken,
  PrismaClient,
  User,
  Role,
  VerificationToken,
  PasswordResetToken,
  Task,
  TaskAssignment,
  Transaction
} from '@prisma/client';
const Prisma = new PrismaClient();

export {
  ZohoToken,
  Prisma,
  User,
  Role,
  Task,
  TaskAssignment,
  Transaction,
  VerificationToken,
  PasswordResetToken
};
