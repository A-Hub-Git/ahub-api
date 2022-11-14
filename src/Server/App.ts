import {HTTP_CODES, ResponseMessage} from '../Utils/ResponseCode';
import express, {Express, Request, Response} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import {Logger, Redis} from '../Libs';
import {User, Role} from '../Routes';
import Prisma from '../prisma';

const app: Express = express();

app.use(cors({origin: '*'}));
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

Redis.on('error', err => Logger.error(`Error connection to redis: ${err}`));

async function main() {
  // Connect the client
  //await Prisma.$connect();
  app.use('/api/v1/users', User);
  app.use('/api/v1/roles', Role);

  //routes
}
main()
  .then(async () => {
    await Prisma.$disconnect();
    await Redis.connect();
    Logger.info('Database Connected!!!');
  })
  .catch(async e => {
    await Prisma.$disconnect();
    Logger.error(`Error Connecting to Database: ${e}`);
    process.exit(1);
  });
app.get('/', (req: Request, res: Response) => {
  try {
    res.status(HTTP_CODES.OK).json('Welcome to A-hub API!!!');
  } catch (error: any) {
    const message =
      process.env.NODE_ENV === 'production'
        ? ResponseMessage.INTERNAL_SERVER_ERROR
        : error.toString();
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(message);
  }
});
app.get('*', (req: Request, res: Response) => {
  try {
    res
      .status(HTTP_CODES.RESOURCE_NOT_FOUND)
      .json('Requested resource not found');
  } catch (error: any) {
    const message =
      process.env.NODE_ENV === 'production'
        ? ResponseMessage.INTERNAL_SERVER_ERROR
        : error.toString();
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(message);
  }
});

export default app;
