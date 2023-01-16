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
