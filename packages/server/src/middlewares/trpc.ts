import * as trpcExpress from '@trpc/server/adapters/express';
import { trpcRouter } from '../trpc';
import chalk from 'chalk';
import { createTrpcContext } from '../trpc/context';
import { isAppError } from '../core/errorFactory';

export const trpcMiddleware = () => {
  return trpcExpress.createExpressMiddleware({
    router: trpcRouter,
    createContext: ({ req, res }) => createTrpcContext({ req, res }),
    onError({ error, path }) {
      console.log(chalk.red('[ ERROR ]'), '-', path, '-', error.message);

      if (!isAppError(error.cause)) {
        console.log(error);
      }
    }
  });
};
