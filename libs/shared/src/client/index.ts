import type { TrpcRouter } from '@daria/server';
import { createAuthService } from './authService';
import { createTrpcClient } from './trpcClient';
import { createUserService } from './userService';
import type { TRPCClientError } from '@trpc/client';
import { createFeatureFlagService } from './featureFlagsService';
import { createTosService } from './tosService';

export type { AuthService } from './authService';
export type { UserService } from './userService';
export type { FeatureFlagService } from './featureFlagsService';
export type { TosService } from './tosService';

export type ApiClientError = TRPCClientError<TrpcRouter>;

export type ApiClient = ReturnType<typeof createApiClient>;
export const createApiClient = (baseUrl: string) => {
  const trpcClient = createTrpcClient(baseUrl);

  return {
    authService: createAuthService(trpcClient),
    userService: createUserService(trpcClient),
    featureFlagservice: createFeatureFlagService(trpcClient),
    tosService: createTosService(trpcClient)
  };
};
