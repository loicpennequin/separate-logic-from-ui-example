import { errors } from '../../core/errorFactory';
import { ErrorKinds } from '@daria/shared';
import { verifyRefreshToken } from '../services/token';
import { userRepo } from '../../user/repositories/user';
import { getTokens } from '../services/auth';

export const refreshJwtUseCase = async (refreshToken: string) => {
  const user = await userRepo.findByRefreshToken(refreshToken);

  if (!user) {
    throw errors.unauthorized(ErrorKinds.INVALID_REFRESH_TOKEN);
  }

  verifyRefreshToken(refreshToken);

  return getTokens(user.id);
};
