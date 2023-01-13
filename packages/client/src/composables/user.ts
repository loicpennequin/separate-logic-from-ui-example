import { authService } from '@/api/auth';
import { userService, type UserService } from '@/api/user';
import { queryKeys } from '@/utils/queryKeys';
import type { TrpcMutationOptions } from '@/utils/types';

export type UseSignupOptions = TrpcMutationOptions<UserService['signup']>;
export const useSignup = (options: UseSignupOptions = {}) => {
  const qc = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    ...options,
    mutationKey: queryKeys.SIGNUP(),
    mutationFn: userService.signup,
    onSuccess(data, ...args) {
      authService.token = data.accessToken;
      qc.refetchQueries({ queryKey: queryKeys.SESSION() });
      push({ name: 'Home' });

      return unref(options.onSuccess)?.(data, ...args);
    }
  });
};

export type UseLostPasswordOptions = TrpcMutationOptions<
  UserService['sendPasswordResetEmail']
>;
export const useLostPassword = (options: UseLostPasswordOptions = {}) => {
  return useMutation({
    ...options,
    mutationKey: queryKeys.LOST_PASSWORD(),
    mutationFn: userService.sendPasswordResetEmail
  });
};

export type UseResetPasswordOptions = TrpcMutationOptions<
  UserService['resetPassword']
>;
export const useResetPassword = (options: UseResetPasswordOptions = {}) => {
  return useMutation({
    ...options,
    mutationKey: queryKeys.RESET_PASSWORD(),
    mutationFn: userService.resetPassword
  });
};
