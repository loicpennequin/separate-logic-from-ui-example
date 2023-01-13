import type { TrpcClient } from '../core/trpcClient';
import type {
  ResetPasswordDto,
  SendPasswordResetEmailDto,
  SignUpDto
} from './dtos';

export type UserService = ReturnType<typeof createUserService>;

export const createUserService = (trpcClient: TrpcClient) => {
  const userService = {
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

  return userService;
};
