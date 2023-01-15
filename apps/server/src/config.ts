import {
  FIFTEEN_MINUTES_IN_SECONDS,
  ONE_MINUTE_IN_SECONDS,
  ONE_WEEK_IN_SECONDS
} from '@daria/shared';
import z from 'zod';

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number(),
  WEBSITE_URL: z.string(),
  CORS: z.object({
    ALLOWED_ORIGINS: z.array(z.string())
  }),
  SESSION: z.object({
    SECRET: z.string()
  }),
  JWT: z.object({
    SECRET: z.string(),
    EXPIRES_IN_SECONDS: z.number()
  }),
  REFRESH_TOKEN: z.object({
    SECRET: z.string(),
    EXPIRES_IN_SECONDS: z.number(),
    PATH: z.string(),
    HTTPONLY: z.boolean(),
    SAMESITE: z.enum(['none', 'lax', 'strict']),
    SECURE: z.boolean()
  }),
  SMTP: z.object({
    PORT: z.coerce.number(),
    HOST: z.string()
  })
});

export const config = configSchema.parse({
  PORT: process.env.PORT ?? 5000,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  WEBSITE_URL: process.env.WEBSITE_URL_VUE,
  CORS: {
    ALLOWED_ORIGINS: [
      process.env.WEBSITE_URL_VUE,
      process.env.WEBSITE_URL_REACT
    ]
  },
  SESSION: {
    SECRET: process.env.SESSION_SECRET
  },
  JWT: {
    SECRET: process.env.SESSION_SECRET,
    EXPIRES_IN_SECONDS: ONE_MINUTE_IN_SECONDS
  },
  REFRESH_TOKEN: {
    SECRET: process.env.SESSION_SECRET,
    EXPIRES_IN_SECONDS: ONE_WEEK_IN_SECONDS,
    PATH: '/',
    HTTPONLY: true,
    SECURE: process.env.NODE_ENV === 'production',
    SAMESITE: 'lax'
  },
  SMTP: {
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT
  }
});
