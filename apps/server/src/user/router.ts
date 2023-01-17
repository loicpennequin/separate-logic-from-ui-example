import {
  SendPasswordResetEmailDto,
  SendPasswordResetEmailResponse,
  SendVerificationEmailDto,
  SendVerificationEmailResponse,
  SignUpDto,
  SignUpResponse,
  VerifyEmailDto,
  VerifyEmailResponse
} from '@daria/shared';
import { procedure, router } from '../trpc/router';
import { loginUseCase } from '../auth/useCases/login';
import { setRefreshTokenCookie } from '../auth/services/auth';
import { createUserUseCase } from './useCases/createUser';
import { sendPasswordResetEmailUseCase } from './useCases/sendPasswordResetEmail';
import { ResetPasswordDto } from '@daria/shared';
import { ResetPasswordResponse } from '@daria/shared';
import { resetPasswordUseCase } from './useCases/resetPassword';
import { verifyEmailUseCase } from './useCases/verifyEmail';
import { config } from '../config';
import { sendVerificationEmailUseCase } from './useCases/sendVerificationEmail';

export const userRouter = router({
  signup: procedure
    .input(SignUpDto)
    .output(SignUpResponse)
    .mutation(async ({ ctx, input }) => {
      const user = await createUserUseCase(input);

      const shouldLogin =
        config.FEATURE_FLAGS.EMAIL_VERIFICATION_ON_SIGNUP !== 'MANDATORY';
      if (!shouldLogin) return { user };

      const tokens = await loginUseCase(input);
      setRefreshTokenCookie(tokens.refreshToken, ctx.res);

      return {
        accessToken: tokens.accessToken,
        user
      };
    }),

  sendPasswordResetEmail: procedure
    .input(SendPasswordResetEmailDto)
    .output(SendPasswordResetEmailResponse)
    .mutation(async ({ input }) => {
      await sendPasswordResetEmailUseCase(input.email);

      return { success: true };
    }),

  resetPassword: procedure
    .input(ResetPasswordDto)
    .output(ResetPasswordResponse)
    .mutation(async ({ input }) => {
      await resetPasswordUseCase(input.password, input.token);

      return { success: true };
    }),

  verifyEmail: procedure
    .input(VerifyEmailDto)
    .output(VerifyEmailResponse)
    .mutation(async ({ ctx, input }) => {
      const tokens = await verifyEmailUseCase(input.token);

      setRefreshTokenCookie(tokens.refreshToken, ctx.res);

      return {
        accessToken: tokens.accessToken
      };
    }),

  sendVerificationEmail: procedure
    .input(SendVerificationEmailDto)
    .output(SendVerificationEmailResponse)
    .mutation(async ({ input }) => {
      await sendVerificationEmailUseCase(input.email);

      return { success: true };
    })
});
