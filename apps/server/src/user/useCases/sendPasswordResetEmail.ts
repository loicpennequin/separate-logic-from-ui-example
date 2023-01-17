import { config } from '../../config';
import { ERROR_MESSAGES } from '../../constants';
import { randomHash } from '../../core/services/encryption';
import { errors } from '../../core/errorFactory';
import { mailerService } from '../../core/services/mail';
import { passwordResetTokenRepo } from '../repositories/passwordResetToken';
import { userRepo } from '../repositories/user';

const passwordResetMailTemplate = (link: string, username?: string) => {
  return {
    subject: `My app - Password reset`,
    body: `<p>Hello ${
      username ?? 'there'
    }, please <a target="_blank" href="${link}">follow this link to reset your password</a>.`
  };
};

export const sendPasswordResetEmailUseCase = async (email: string) => {
  const user = await userRepo.findByEmail(email);

  if (!user) throw errors.notFound(ERROR_MESSAGES.USER_NOT_FOUND_BY_EMAIL);
  const token = randomHash();

  await passwordResetTokenRepo.upsertByUserId(user.id, token);

  await mailerService.sendMail({
    to: user.email,
    template: passwordResetMailTemplate(
      `${config.WEBSITE_URL}/reset-password?token=${token}`
    )
  });

  return { success: true };
};
