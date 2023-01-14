import type { UserService } from '@daria/shared/dist/client';
import { queryKeys } from '@/utils/queryKeys';
import type { ApiClientMutationOptions } from '@/utils/types';
import { useNavigate } from 'react-router-dom';

export type UseSignupOptions = ApiClientMutationOptions<UserService['signup']>;
export const useSignup = (options: UseSignupOptions = {}) => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { authService, userService } = useApiClient();

  return useMutation({
    ...options,
    mutationKey: queryKeys.SIGNUP(),
    mutationFn: userService.signup,
    onSuccess(data, ...args) {
      authService.token = data.accessToken;
      qc.refetchQueries({ queryKey: queryKeys.SESSION() });
      navigate('/');

      return options.onSuccess?.(data, ...args);
    }
  });
};

export type UseLostPasswordOptions = ApiClientMutationOptions<
  UserService['sendPasswordResetEmail']
>;
export const useLostPassword = (options: UseLostPasswordOptions = {}) => {
  const { userService } = useApiClient();

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
  const { userService } = useApiClient();

  return useMutation({
    ...options,
    mutationKey: queryKeys.RESET_PASSWORD(),
    mutationFn: userService.resetPassword
  });
};
