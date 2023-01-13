import { createAuthService } from './domain/auth/authService';
import { createTrpcClient } from './domain/core/trpcClient';
import { createUserService } from './domain/user/userService';

export type { AuthService } from './domain/auth/authService';
export type { UserService } from './domain/user/userService';

export type ApiClient = ReturnType<typeof createApiClient>;

export const createApiClient = (baseUrl: string) => {
  const trpcClient = createTrpcClient(baseUrl);

  return {
    authService: createAuthService(trpcClient),
    userService: createUserService(trpcClient)
  };
};
