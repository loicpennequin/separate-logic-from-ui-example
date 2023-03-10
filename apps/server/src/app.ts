import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { corsMiddleware } from './middlewares/cors';
import { API_ENDPOINT } from './constants';
import { trpcMiddleware } from './middlewares/trpc';
import helmet from 'helmet';
import compression from 'compression';

export const createApp = () => {
  const app = express();

  if (config.NODE_ENV === 'production') {
    app.use(compression());
  } else {
    app.use(corsMiddleware());
  }

  app.use(helmet());
  app.use(cookieParser(config.SESSION.SECRET));
  app.use(API_ENDPOINT, trpcMiddleware());

  return app;
};
