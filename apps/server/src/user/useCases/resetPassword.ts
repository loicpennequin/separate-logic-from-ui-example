import { ErrorKinds } from '@daria/shared';
import { hashPassword } from '../../core/services/encryption';
import { errors } from '../../core/errorFactory';
import { userRepo } from '../repositories/user';

export const resetPasswordUseCase = async (
  newPassword: string,
  token: string
) => {
  const user = await userRepo.findByPasswordResetToken(token);

  if (!user) throw errors.notFound(ErrorKinds.USER_NOT_FOUND_BY_EMAIL);

  await userRepo.updatePasswordById(user.id, await hashPassword(newPassword));
};
