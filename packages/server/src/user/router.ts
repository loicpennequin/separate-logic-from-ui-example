import {
  SendPasswordResetEmailDto,
  SendPasswordResetEmailResponse,
  SignUpDto,
  SignUpResponse
} from '@daria/shared';
import { procedure, router } from '../trpc/router';
import { loginUseCase } from '../auth/useCases/login';
import { setRefreshTokenCookie } from '../auth/services/auth';
import { createUserUseCase } from './useCases/createUser';
import { sendPasswordResetEmailUseCase } from './useCases/sendPasswordResetEmail';
import { ResetPasswordDto } from '@daria/shared';
import { ResetPasswordResponse } from '@daria/shared';
import { resetPasswordUseCase } from './useCases/resetPassword';

export const userRouter = router({
  signup: procedure
    .input(SignUpDto)
    .output(SignUpResponse)
    .mutation(async ({ ctx, input }) => {
      const user = await createUserUseCase(input);
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
    })
});
