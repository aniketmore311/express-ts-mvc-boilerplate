export const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MORGAN_MODE: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
