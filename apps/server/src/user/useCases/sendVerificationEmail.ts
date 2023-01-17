import { config } from '../../config';
import { EmailVerificationModes, ErrorKinds } from '@daria/shared';
import { randomHash } from '../../core/services/encryption';
import { errors } from '../../core/errorFactory';
import { mailerService } from '../../core/services/mail';
import { userRepo } from '../repositories/user';
import { verificationTokenRepo } from '../repositories/verificationToken';
import { CLIENT_ENDPOINTS } from '../../constants';

const verificationMailTemplate = (link: string, username?: string) => {
  return {
    subject: `My app - Email verification`,
    body: `<p>Hello ${
      username ?? 'there'
    }, please <a target="_blank" href="${link}">follow this link to verify your email</a>.`
  };
};

export const sendVerificationEmailUseCase = async (email: string) => {
  const isDisabled =
    config.FEATURE_FLAGS.EMAIL_VERIFICATION_ON_SIGNUP ===
    EmailVerificationModes.NONE;
  if (isDisabled) throw errors.badRequest(ErrorKinds.FEATURE_NOT_ENABLED);

  const user = await userRepo.findByEmail(email);

  if (!user) throw errors.notFound(ErrorKinds.NOT_FOUND);

  const token = randomHash();
  await verificationTokenRepo.upsertByUserId(user.id, token);

  await mailerService.sendMail({
    to: user.email,
    template: verificationMailTemplate(CLIENT_ENDPOINTS.VERIFY(token))
  });

  return { success: true };
};
