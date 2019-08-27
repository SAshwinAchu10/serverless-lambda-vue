import * as dotenv from 'dotenv';
dotenv.config();

export default {
  APP: process.env.APP || 'development',
  PORT: process.env.PORT || '3000',
  DB_URL: process.env.DB_HOST || 'mongodb://3.90.6.173:27017/serverless',
};
