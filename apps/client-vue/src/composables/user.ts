import type { UserService } from '@daria/shared';
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
      if (!data.accessToken) {
        return push('/signup-confirm');
      }

      authService.token = data.accessToken;
      qc.refetchQueries({ queryKey: queryKeys.SESSION() });
      push('/');

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

export type UseVerifyEmailOptions = ApiClientMutationOptions<
  UserService['verifyEmail']
>;
export const useVerifyEmail = (options: UseVerifyEmailOptions = {}) => {
  const qc = useQueryClient();
  const { push } = useRouter();
  const { userService, authService } = useApi();

  return useMutation({
    ...options,
    mutationKey: queryKeys.VERIFY_EMAIL(),
    mutationFn: userService.verifyEmail,
    onSuccess(data, ...args) {
      authService.token = data.accessToken;
      qc.refetchQueries({ queryKey: queryKeys.SESSION() });
      push('/');

      return unref(options.onSuccess)?.(data, ...args);
    }
  });
};

export type UseSendVerificationEmailOptions = ApiClientMutationOptions<
  UserService['sendVerificationEmail']
>;
export const useSendVerificationEmail = (
  options: UseSendVerificationEmailOptions = {}
) => {
  const { userService } = useApi();

  return useMutation({
    ...options,
    mutationKey: queryKeys.SEND_VERIFY_EMAIL(),
    mutationFn: userService.sendVerificationEmail
  });
};
