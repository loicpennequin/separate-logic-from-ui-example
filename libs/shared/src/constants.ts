import type { Values } from './types';

export const ONE_MINUTE_IN_MS = 1000 * 60;
export const FIFTEEN_MINUTES_IN_MS = ONE_MINUTE_IN_MS * 15;

export const ONE_MINUTE_IN_SECONDS = ONE_MINUTE_IN_MS / 1000;
export const FIFTEEN_MINUTES_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 15;

export const ONE_DAY_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 60 * 24;
export const ONE_WEEK_IN_SECONDS = ONE_DAY_IN_SECONDS * 7;

export const EmailVerificationModes = {
  NONE: 'NONE',
  MANDATORY: 'MANDATORY',
  REMINDER: 'REMINDER'
} as const;
export type EmailVerificationModes = Values<typeof EmailVerificationModes>;

export const ErrorKinds = {
  UNEXPECTED: 0,
  UNAUTHORIZED: 1,
  NOT_FOUND: 2,
  INVALID_CREDENTIALS: 3,
  INVALID_JWT: 4,
  NO_REFRESH_TOKEN: 5,
  INVALID_REFRESH_TOKEN: 6,
  EMAIL_ALREADY_IN_USE: 7,
  EMAIL_NOT_VERIFIED: 8,
  USER_NOT_FOUND_BY_EMAIL: 10,
  TOS_NOT_ACCEPTED: 11,
  FEATURE_NOT_ENABLED: 12
} as const;
export type ErrorKinds = Values<typeof ErrorKinds>;

export const ErrorMessages = {
  [ErrorKinds.UNEXPECTED]: 'An unexpected error has occured.',
  [ErrorKinds.UNAUTHORIZED]:
    'You need to be authenticated to access this procedure',
  [ErrorKinds.NOT_FOUND]: 'Resource not found',
  [ErrorKinds.INVALID_CREDENTIALS]: 'The e-mail or password is incorrect.',
  [ErrorKinds.INVALID_JWT]: 'The access token in invalid or corrupted',
  [ErrorKinds.NO_REFRESH_TOKEN]: 'No refresh token provided',
  [ErrorKinds.INVALID_REFRESH_TOKEN]:
    'The refresh token in invalid or corrupted',
  [ErrorKinds.EMAIL_ALREADY_IN_USE]:
    'An account with this email already exists',
  [ErrorKinds.EMAIL_NOT_VERIFIED]: "This account hasn't verified their email",
  [ErrorKinds.USER_NOT_FOUND_BY_EMAIL]:
    'No account was found using this email address',
  [ErrorKinds.TOS_NOT_ACCEPTED]:
    'You need to accept the conditions and terms of service',
  [ErrorKinds.FEATURE_NOT_ENABLED]:
    'This feature is not enabled on this platform'
} satisfies Record<ErrorKinds, string>;
export type ErrorMessages = Values<typeof ErrorMessages>;
