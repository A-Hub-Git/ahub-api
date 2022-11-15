import {PrismaClient, User, Role} from '@prisma/client';
const Prisma = new PrismaClient({
  errorFormat: 'pretty',
  log: [
    {
      emit: 'event',
      level: 'query'
    },
    {
      emit: 'stdout',
      level: 'error'
    },
    {
      emit: 'stdout',
      level: 'info'
    },
    {
      emit: 'stdout',
      level: 'warn'
    }
  ]
});
export {Prisma, User, Role};
