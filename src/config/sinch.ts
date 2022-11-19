import dotenv from 'dotenv';

dotenv.config();
const sinchConfig = {
  SINCH_SERVICE_PLAN_ID: process.env.SINCH_SERVICE_PLAN_ID,
  SINCH_BASE_URL: process.env.SINCH_BASE_URL,
  SINCH_API_TOKEN: process.env.SINCH_API_TOKEN,
  SINCH_SINCH_NUMBER: process.env.SINCH_SINCH_NUMBER
};

export default sinchConfig;
