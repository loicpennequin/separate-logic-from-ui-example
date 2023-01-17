import type { Values } from '@daria/shared';
import { config } from './config';

export const API_ENDPOINT = '/api';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';

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

export const CLIENT_ENDPOINTS = {
  VERIFY: (token: string) => `${config.WEBSITE_URL}/verify?token=${token}`,
  RESET_PASSWORD: (token: string) =>
    `${config.WEBSITE_URL}/reset-password?token=${token}`
};
