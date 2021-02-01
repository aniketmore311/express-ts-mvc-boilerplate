import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MORGAN_MODE: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  ROOT_DIR: path.join(__dirname + '/../..'),
  SESS_KEY: process.env.SESS_KEY || 'session-key',
  COOKIE_KEY: process.env.COOKIE_KEy || 'cookie-key',
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
};
