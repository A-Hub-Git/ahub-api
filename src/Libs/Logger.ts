import path from 'path';
import winston from 'winston';
const {combine, timestamp, printf, label, align} = winston.format;

class Logger {
  private context;
  private logger;
  private loggerConfiguration: any;
  constructor(_context: any) {
    this.context = _context;
    this._loadConfiguration();
    this.logger = winston.createLogger(this.loggerConfiguration);
  }

  log(message: string) {
    this.logger.log({
      // Message to be logged
      message: message,
      // Level of the message logging
      level: 'info'
    });
  }

  info(message: string) {
    this.logger.info(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  _loadConfiguration() {
    this.loggerConfiguration = {
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          level: 'error',
          // Create the log directory if it does not exist
          filename: `${path.join(process.cwd(), 'logs', 'error.log')}`
        })
      ],
      format: combine(
        label({
          label: `${this.context}`
        }),
        timestamp({
          format: 'MMM-DD-YYYY HH:mm:ss'
        }),

        printf(
          info =>
            `${info.label}:${info.level.toUpperCase()} [${[info.timestamp]}] ${
              info.message
            }`
        )
      )
    };
    winston.addColors({
      error: 'red',
      warn: 'yellow',
      info: 'cyan',
      debug: 'green'
    });
  }
}

export default new Logger('AHUB API');
