require('dotenv').config();

export default {
  clientID: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  code: process.env.ZOHO_CODE,
  scope: 'Desk.tickets.ALL'
};
