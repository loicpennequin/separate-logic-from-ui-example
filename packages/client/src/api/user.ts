import { trpcClient } from '@/trpc';
import type { SignUpDto } from '@daria/shared';

export type UserService = typeof userService;
export const userService = {
  signup(data: SignUpDto) {
    return trpcClient.user.signup.mutate(data);
  }
};
