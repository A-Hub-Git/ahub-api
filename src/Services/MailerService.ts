import moment from 'moment';
import Axios from 'axios';
import nodemailer from 'nodemailer';
import {Logger} from '../Libs';
import String from '../Utils/String';
import {mailerConfig} from '../config';

class MailerService {
  private config;
  private transporter;

  constructor() {
    this.config = mailerConfig;
    this.transporter = nodemailer.createTransport({
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
  _sendMail(to: string, subject: string, html: HTMLLIElement) {
    const options = {
      from: this.config.from,
      to,
      subject,
      html
    };
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(options, (err: unknown, data: any) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  }
}
export default new MailerService();
