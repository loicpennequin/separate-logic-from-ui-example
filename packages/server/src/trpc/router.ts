import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import chalk from 'chalk';
import type { Context } from './context';
import { ERROR_MESSAGES } from '../constants';
import { errors, isAppError } from '../core/errorFactory';

export const logger = (...messages: string[]) =>
  console.log(chalk.blue('[ TRPC ]'), ' - ', ...messages);

export const t = initTRPC
  .context<Context>()
  .meta<{
    needsAuth?: boolean;
  }>()
  .create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
      if (isAppError(error.cause)) {
        return {
          ...shape,
          data: {
            ...shape.data,
            code: error.cause.code,
            httpStatus: error.cause.httpStatus
          }
        };
      }

      return shape;
    }
  });

const loggerMiddleware = t.middleware(async ({ path, next }) => {
  logger(`${path}`);

  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;
  logger(`${path} - END : ${durationMs}ms`);

  return result;
});

const authMiddleware = t.middleware(({ ctx, meta, next }) => {
  if (meta?.needsAuth && !ctx.session) {
    throw errors.unauthorized(ERROR_MESSAGES.UNAUTHORIZED);
  }
  return next();
});

export const middleware = t.middleware;
export const router = t.router;
export const procedure = t.procedure.use(loggerMiddleware).use(authMiddleware);
