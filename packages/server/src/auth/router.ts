import {
  LoginDto,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  UserResponse,
  isString
} from '@daria/shared';
import { procedure, router } from '../trpc/router';
import { ERROR_MESSAGES, REFRESH_TOKEN_COOKIE } from '../constants';
import { loginUseCase } from './useCases/login';
import { logoutUseCase } from './useCases/logout';
import { errors } from '../core/errorFactory';
import { refreshJwtUseCase } from './useCases/refreshJwt';
import { config } from '../config';
import { Response } from 'express';

const setRefreshTokenCookie = (refreshToken: string, res: Response) => {
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
    path: config.REFRESH_TOKEN.PATH,
    httpOnly: config.REFRESH_TOKEN.HTTPONLY,
    secure: config.REFRESH_TOKEN.SECURE,
    sameSite: config.REFRESH_TOKEN.SAMESITE,
    maxAge: Date.now() + config.REFRESH_TOKEN.EXPIRES_IN_SECONDS * 1000
  });
};

export const authRouter = router({
  login: procedure
    .input(LoginDto)
    .output(LoginResponse)
    .mutation(async ({ ctx, input }) => {
      const { accessToken, refreshToken } = await loginUseCase(input);
      setRefreshTokenCookie(refreshToken, ctx.res);

      return { accessToken };
    }),

  logout: procedure.output(LogoutResponse).mutation(async ({ ctx }) => {
    const cookie = ctx.req.cookies?.[REFRESH_TOKEN_COOKIE];
    if (cookie && isString(cookie)) {
      ctx.res.clearCookie(REFRESH_TOKEN_COOKIE);
      await logoutUseCase(cookie);
    }

    return { success: true };
  }),

  refreshJwt: procedure
    .output(RefreshTokenResponse)
    .mutation(async ({ ctx }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const cookie = ctx.req.cookies?.[REFRESH_TOKEN_COOKIE] as string;
      if (!cookie) {
        throw errors.unauthorized(ERROR_MESSAGES.NO_REFRESH_TOKEN);
      }

      try {
        const { accessToken, refreshToken } = await refreshJwtUseCase(cookie);

        setRefreshTokenCookie(refreshToken, ctx.res);

        return { accessToken };
      } catch (err) {
        await logoutUseCase(cookie);
        throw err;
      }
    }),

  session: procedure
    .output(UserResponse)
    .meta({ needsAuth: true })
    .query(({ ctx }) => {
      return ctx.session!;
    })
});
