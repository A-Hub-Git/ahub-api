import {createServer} from 'http';
import dotenv from 'dotenv';
import {Logger} from '../Libs';
import App from './App';

dotenv.config();
export default class Server {
  private port;
  constructor() {
    this.port = process.env.PORT;
  }

  public createServer() {
    createServer(App).listen(this.port);
    Logger.info(`Server Listening on port: ${this.port}`);
  }
}
