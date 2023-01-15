import { ERROR_MESSAGES } from '../../constants';
import { hashPassword } from '../../core/encryptionService';
import { errors } from '../../core/errorFactory';
import { userRepo } from '../repositories/user';

export const resetPasswordUseCase = async (
  newPassword: string,
  token: string
) => {
  const user = await userRepo.findByPasswordResetToken(token);

  if (!user) throw errors.notFound(ERROR_MESSAGES.USER_NOT_FOUND_BY_EMAIL);

  await userRepo.updatePasswordById(user.id, await hashPassword(newPassword));
};
