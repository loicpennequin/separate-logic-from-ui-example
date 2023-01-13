import { trpcClient } from '@/trpc';
import type {
  ResetPasswordDto,
  SendPasswordResetEmailDto,
  SignUpDto
} from '@daria/shared';

export type UserService = typeof userService;
export const userService = {
  signup(data: SignUpDto) {
    return trpcClient.user.signup.mutate(data);
  },

  sendPasswordResetEmail(data: SendPasswordResetEmailDto) {
    return trpcClient.user.sendPasswordResetEmail.mutate(data);
  },

  resetPassword(data: ResetPasswordDto) {
    return trpcClient.user.resetPassword.mutate(data);
  }
};
