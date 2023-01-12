import { config } from '../../config';
import { REFRESH_TOKEN_COOKIE } from '../../constants';
import { UUID } from '../../utils';
import { refreshTokenRepo } from '../repositories/refreshToken';
import { generateTokens } from './token';
import { Response } from 'express';

export const getTokens = async (userId: UUID) => {
  const tokens = generateTokens(userId);
  await refreshTokenRepo.updateByUserId(userId, tokens.refreshToken);

  return tokens;
};

export const setRefreshTokenCookie = (refreshToken: string, res: Response) => {
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
    path: config.REFRESH_TOKEN.PATH,
    httpOnly: config.REFRESH_TOKEN.HTTPONLY,
    secure: config.REFRESH_TOKEN.SECURE,
    sameSite: config.REFRESH_TOKEN.SAMESITE,
    maxAge: Date.now() + config.REFRESH_TOKEN.EXPIRES_IN_SECONDS * 1000
  });
};
