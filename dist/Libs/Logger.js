"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, printf, label, align } = winston_1.default.format;
class Logger {
    constructor(_context) {
        this.context = _context;
        this._loadConfiguration();
        this.logger = winston_1.default.createLogger(this.loggerConfiguration);
    }
    log(message) {
        this.logger.log({
            // Message to be logged
            message: message,
            // Level of the message logging
            level: 'info'
        });
    }
    info(message) {
        this.logger.info(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
    error(message) {
        this.logger.error(message);
    }
    _loadConfiguration() {
        this.loggerConfiguration = {
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({
                    level: 'error',
                    // Create the log directory if it does not exist
                    filename: `${path_1.default.join(process.cwd(), 'logs', 'error.log')}`
                })
            ],
            format: combine(label({
                label: `${this.context}`
            }), timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss'
            }), printf(info => `${info.label}:${info.level.toUpperCase()} [${[info.timestamp]}] ${info.message}`))
        };
        winston_1.default.addColors({
            error: 'red',
            warn: 'yellow',
            info: 'cyan',
            debug: 'green'
        });
    }
}
exports.default = new Logger('AHUB API');
//# sourceMappingURL=Logger.js.map