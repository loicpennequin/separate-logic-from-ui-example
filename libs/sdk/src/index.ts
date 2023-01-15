import type { TrpcRouter } from '@daria/server';
import { createAuthService } from './authService';
import { createTrpcClient } from './trpcClient';
import { createUserService } from './userService';
import type { TRPCClientError } from '@trpc/client';

export type { AuthService } from './authService';
export type { UserService } from './userService';

export type SdkError = TRPCClientError<TrpcRouter>;
export type SdkRouter = TrpcRouter;

export type ApiClient = ReturnType<typeof createApiClient>;
export const createApiClient = (baseUrl: string) => {
  const trpcClient = createTrpcClient(baseUrl);

  return {
    authService: createAuthService(trpcClient),
    userService: createUserService(trpcClient)
  };
};

export const foo = 123;
