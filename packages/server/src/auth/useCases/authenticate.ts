import { errors } from '../../core/errorFactory';
import { ERROR_MESSAGES } from '../../constants';
import { userRepo } from '../../user/repositories/user';
import { verifyJwt } from '../services/token';

export const authenticateUseCase = async (token: string) => {
  const { sub } = verifyJwt(token);
  const user = await userRepo.findById(sub as string);

  if (!user) {
    throw errors.unauthorized(ERROR_MESSAGES.INVALID_JWT);
  }

  return user;
};
