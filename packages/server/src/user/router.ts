import { SignUpDto, SignUpResponse } from '@daria/shared';
import { procedure, router } from '../trpc/router';
import { loginUseCase } from '../auth/useCases/login';
import { createUserUseCase } from './useCases/createUser';
import { setRefreshTokenCookie } from '../auth/services/auth';

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
    })
});
