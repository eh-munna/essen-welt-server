import dotenv from 'dotenv';

dotenv.config({ path: `${process.cwd()}/.env` });

export const getRequiredEnv = (key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return process.env[key];
};

export default {
  nodeEnv: getRequiredEnv('NODE_ENV') || 'development',
  port: getRequiredEnv('PORT') || 3000,
  dbUri: getRequiredEnv('DB_URI'),
  secretKey: getRequiredEnv('SECRET_KEY'),
};
