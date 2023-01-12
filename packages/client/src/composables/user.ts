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
