import type { UserService } from '@daria/sdk';
import { queryKeys } from '@/utils/queryKeys';
import type { ApiClientMutationOptions } from '@/utils/types';

export type UseSignupOptions = ApiClientMutationOptions<UserService['signup']>;
export const useSignup = (options: UseSignupOptions = {}) => {
  const qc = useQueryClient();
  const { push } = useRouter();
  const { authService, userService } = useApi();

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

export type UseLostPasswordOptions = ApiClientMutationOptions<
  UserService['sendPasswordResetEmail']
>;
export const useLostPassword = (options: UseLostPasswordOptions = {}) => {
  const { userService } = useApi();

  return useMutation({
    ...options,
    mutationKey: queryKeys.LOST_PASSWORD(),
    mutationFn: userService.sendPasswordResetEmail
  });
};

export type UseResetPasswordOptions = ApiClientMutationOptions<
  UserService['resetPassword']
>;
export const useResetPassword = (options: UseResetPasswordOptions = {}) => {
  const { userService } = useApi();

  return useMutation({
    ...options,
    mutationKey: queryKeys.RESET_PASSWORD(),
    mutationFn: userService.resetPassword
  });
};
