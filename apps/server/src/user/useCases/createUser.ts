import { EmailVerificationModes, SignUpDto, noop } from '@daria/shared';
import { hashPassword } from '../../core/services/encryption';
import { userRepo } from '../repositories/user';
import { errors } from '../../core/errorFactory';
import { ErrorKinds } from '@daria/shared';
import { config } from '../../config';
import { sendVerificationEmailUseCase } from './sendVerificationEmail';

export const createUserUseCase = async (dto: SignUpDto) => {
  if (config.FEATURE_FLAGS.ACCEPT_TOS_ON_SIGNUP && !dto.tosAcceptedAt) {
    throw errors.badRequest(ErrorKinds.TOS_NOT_ACCEPTED);
  }

  const exists = await userRepo.findByEmail(dto.email);
  if (exists) {
    throw errors.badRequest(ErrorKinds.EMAIL_ALREADY_IN_USE);
  }

  const user = await userRepo.create({
    email: dto.email,
    passwordHash: await hashPassword(dto.password),
    tosAcceptedAt: dto.tosAcceptedAt
  });

  if (
    config.FEATURE_FLAGS.EMAIL_VERIFICATION_ON_SIGNUP !==
    EmailVerificationModes.NONE
  ) {
    sendVerificationEmailUseCase(user.email).catch(noop);
  }

  return user;
};
