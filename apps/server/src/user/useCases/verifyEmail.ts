import { getTokens } from '../../auth/services/auth';
import { ErrorKinds } from '@daria/shared';
import { errors } from '../../core/errorFactory';
import { userRepo } from '../repositories/user';

export const verifyEmailUseCase = async (token: string) => {
  const user = await userRepo.findByVerificationToken(token);

  if (!user) throw errors.notFound(ErrorKinds.NOT_FOUND);

  await userRepo.verifyById(user.id);

  return getTokens(user.id);
};
