import type { inferAsyncReturnType } from '@trpc/server';
import type { Request, Response } from 'express';
import { authenticateUseCase } from '../auth/useCases/authenticate';

const parseAuthHeader = (header: string) => header.replace('Bearer ', '');

export type CreateContextOptions = {
  req: Request;
  res: Response;
};
export const createTrpcContext = async (ctx: CreateContextOptions) => {
  const authHeader = ctx.req.headers.authorization;

  return {
    req: ctx.req,
    res: ctx.res,
    session: authHeader
      ? await authenticateUseCase(parseAuthHeader(authHeader))
      : null
  };
};

export type Context = inferAsyncReturnType<typeof createTrpcContext>;
