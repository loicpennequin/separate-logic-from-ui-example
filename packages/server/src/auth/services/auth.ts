import { UUID } from '../../utils';
import { refreshTokenRepo } from '../repositories/refreshToken';
import { generateTokens } from './token';

export const getTokens = async (userId: UUID) => {
  const tokens = generateTokens(userId);
  await refreshTokenRepo.updateByUserId(userId, tokens.refreshToken);

  return tokens;
};
