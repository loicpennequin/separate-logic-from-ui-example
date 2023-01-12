import { TRPCError } from '@trpc/server';
import { ERROR_CODES } from './constants';
import { Context } from './trpc/context';
import { isAppError } from './core/errorFactory';

export const handleProcedureError = (err: unknown) => {
  throw new TRPCError({
    code: isAppError(err) ? err.code : ERROR_CODES.INTERNAL_SERVER_ERROR,
    message: (err as Error).message
  });
};

export type ProcedureArgs<TInput> = {
  ctx: Context;
  input: TInput;
};
export type UUID = string;
