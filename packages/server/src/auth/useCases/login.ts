import type { LoginDto } from '@daria/shared';
import { errors } from '../../core/errorFactory';
import { ERROR_MESSAGES } from '../../constants';
import { comparePassword } from '../../core/encryptionService';
import { userRepo } from '../../user/repositories/user';
import { getTokens } from '../services/auth';

export const loginUseCase = async ({ email, password }: LoginDto) => {
  const user = await userRepo.findByEmail(email);

  const isValid = user && (await comparePassword(password, user.passwordHash));
  if (!isValid) {
    throw errors.unauthorized(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  return getTokens(user.id);
};
