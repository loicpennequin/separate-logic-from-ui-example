import { errors } from '../../core/errorFactory';
import { ERROR_MESSAGES } from '../../constants';
import { verifyRefreshToken } from '../services/token';
import { userRepo } from '../../user/repositories/user';
import { getTokens } from '../services/auth';

export const refreshJwtUseCase = async (refreshToken: string) => {
  const user = await userRepo.findByRefreshToken(refreshToken);

  if (!user) {
    throw errors.unauthorized(ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
  }

  verifyRefreshToken(refreshToken);

  return getTokens(user.id);
};
