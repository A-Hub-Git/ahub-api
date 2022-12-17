"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
class MailerService {
    constructor() {
        this.config = config_1.mailerConfig;
        this.transporter = nodemailer_1.default.createTransport({
            host: this.config.host,
            port: Number(this.config.port),
            auth: {
                user: this.config.user,
                pass: this.config.pass
            },
            secure: true,
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        });
    }
    _sendMail({ to, subject, html, from }) {
        const options = {
            from,
            to,
            subject,
            html
        };
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(options, (err, data) => {
                if (!err) {
                    resolve(data);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}
exports.default = new MailerService();
//# sourceMappingURL=MailerService.js.map