import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export default {
  port: process.env.PORT || 4000,
  MONGODB_URL: process.env.MONGODB_URL,
  SECRET: process.env.SECRET,
};
