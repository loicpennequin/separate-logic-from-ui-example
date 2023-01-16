import type { SignUpDto } from '@daria/shared';
import { hashPassword } from '../../core/encryptionService';
import { userRepo } from '../repositories/user';
import { errors } from '../../core/errorFactory';
import { ERROR_MESSAGES } from '../../constants';
import { config } from '../../config';

export const createUserUseCase = async (dto: SignUpDto) => {
  const exists = await userRepo.findByEmail(dto.email);

  if (config.FEATURE_FLAGS.ACCEPT_TOS_ON_SIGNUP && !dto.tosAcceptedAt) {
    throw errors.badRequest(ERROR_MESSAGES.TOS_NOT_ACCEPTED);
  }

  if (exists) {
    throw errors.badRequest(ERROR_MESSAGES.EMAIL_ALREADY_IN_USE);
  }

  return userRepo.create({
    email: dto.email,
    passwordHash: await hashPassword(dto.password)
  });
};
