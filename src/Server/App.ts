import {HTTP_CODES, ResponseMessage} from '../Utils/Enum';
import express, {Express, Request, Response} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import {Logger} from '../Libs';
import {User, Role, Auth} from '../Routes';
import {Prisma} from '../prisma';
import RedisClient from '../Libs/redis';

const app: Express = express();

app.use(cors({origin: '*'}));
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.enable('trust proxy');

async function connectDb() {
  // Connect the client

  try {
    await Prisma.$connect();
    Logger.info('Database Connected!!!');
    app.use('/api/v1/users', User);
    app.use('/api/v1/roles', Role);
    app.use('/api/v1/auth', Auth);
  } catch (e) {
    await Prisma.$disconnect();
    Logger.error(`Error Connecting to Database: ${e}`);
    process.exit(1);
  }

  //routes
}

connectDb();

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
