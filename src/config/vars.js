import dotenv from 'dotenv';
dotenv.config();

export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
export const jwt = {
  secret: process.env.JWT_SECRET,
  accessExpirationMinutes: process.env.JWT_EXPIRATION_MINUTES,
};
