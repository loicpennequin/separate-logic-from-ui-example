import type { Values } from '@daria/shared';

export const API_ENDPOINT = '/api';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You need to be authenticated to access this procedure',
  INVALID_CREDENTIALS: 'The e-mail or password is incorrect.',
  INVALID_JWT: 'The access token in invalid or corrupted',
  NO_REFRESH_TOKEN: 'No refresh token provided',
  INVALID_REFRESH_TOKEN: 'The refresh token in invalid or corrupted',
  EMAIL_ALREADY_IN_USE: 'An account with this email already exists',
  USER_NOT_FOUND_BY_EMAIL: 'No account was found using this email address',
  TOS_NOT_ACCEPTED: 'You need to accept the conditions and terms of service'
} as const;

export const ERROR_CODES = {
  PARSE_ERROR: 'PARSE_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT'
} as const;
export type ErrorCode = Values<typeof ERROR_CODES>;
