import { EmailVerificationModes, LoginDto } from '@daria/shared';
import { errors } from '../../core/errorFactory';
import { ErrorKinds } from '@daria/shared';
import { comparePassword } from '../../core/services/encryption';
import { userRepo } from '../../user/repositories/user';
import { getTokens } from '../services/auth';
import { config } from '../../config';

export const loginUseCase = async ({ email, password }: LoginDto) => {
  const user = await userRepo.findByEmail(email);

  const isValid = user && (await comparePassword(password, user.passwordHash));
  if (!isValid) {
    throw errors.unauthorized(ErrorKinds.INVALID_CREDENTIALS);
  }

  const needsVerification =
    config.FEATURE_FLAGS.EMAIL_VERIFICATION_ON_SIGNUP ===
    EmailVerificationModes.MANDATORY;

  if (needsVerification && !user.verifiedAt) {
    throw errors.unauthorized(ErrorKinds.EMAIL_NOT_VERIFIED);
  }

  return getTokens(user.id);
};
