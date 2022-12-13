require('dotenv').config();

export default {
  host: process.env.MAIL_HOST || ('' as string | undefined),
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USERNAME || '',
  pass: process.env.MAIL_PASSWORD || '',
  from: process.env.MAIL_SENDER || ''
};
