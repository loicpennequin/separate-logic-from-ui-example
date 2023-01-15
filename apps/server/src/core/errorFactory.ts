import { ERROR_CODES, type ErrorCode } from '../constants';

class AppError extends Error {
  isAppError = true;

  constructor(
    message: string,
    public code: ErrorCode,
    public httpStatus: number
  ) {
    super(message);
  }
}

export const isAppError = (x: unknown): x is AppError => {
  return x instanceof AppError;
};

const createAppError =
  (code: ErrorCode, httpStatus: number) => (message: string) =>
    new AppError(message, code, httpStatus);

export const errors = {
  unauthorized: createAppError(ERROR_CODES.UNAUTHORIZED, 401),
  badRequest: createAppError(ERROR_CODES.BAD_REQUEST, 400),
  unexpected: createAppError(ERROR_CODES.INTERNAL_SERVER_ERROR, 500),
  forbidden: createAppError(ERROR_CODES.FORBIDDEN, 403),
  notFound: createAppError(ERROR_CODES.NOT_FOUND, 404)
};
