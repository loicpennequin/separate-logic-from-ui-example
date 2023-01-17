import jwt from 'jsonwebtoken';
import { config } from '../../config';
import type { UUID } from '../../utils';
import { errors } from '../../core/errorFactory';
import { ERROR_MESSAGES } from '../../constants';
import { randomHash } from '../../core/services/encryption';

export const generateTokens = (userId: UUID) => {
  return {
    accessToken: jwt.sign({ sub: userId }, config.JWT.SECRET, {
      expiresIn: config.JWT.EXPIRES_IN_SECONDS
    }),
    refreshToken: jwt.sign({ sub: randomHash() }, config.REFRESH_TOKEN.SECRET, {
      expiresIn: config.REFRESH_TOKEN.EXPIRES_IN_SECONDS
    })
  };
};

const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret, {
      complete: false
    });
  } catch {
    throw errors.unauthorized(ERROR_MESSAGES.INVALID_JWT);
  }
};

export const verifyJwt = (token: string) => {
  return verifyToken(token, config.JWT.SECRET) as jwt.JwtPayload;
};

export const verifyRefreshToken = (token: string) => {
  return verifyToken(token, config.REFRESH_TOKEN.SECRET);
};
