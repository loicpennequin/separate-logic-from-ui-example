import { authService, type AuthService } from '@/api/auth';
import { queryKeys } from '@/utils/queryKeys';
import type { TrpcMutationOptions, TrpcQueryOptions } from '@/utils/types';

export type UseLoginOptions = TrpcMutationOptions<AuthService['login']>;
export const useLogin = (options: UseLoginOptions = {}) => {
  const qc = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    ...options,
    mutationKey: queryKeys.LOGIN(),
    mutationFn: authService.login,
    onSuccess(...args) {
      qc.refetchQueries({ queryKey: queryKeys.SESSION() });
      push({ name: 'Home' });

      return unref(options.onSuccess)?.(...args);
    }
  });
};

export type UseLogoutOptions = TrpcMutationOptions<AuthService['logout']>;
export const useLogout = (options: UseLogoutOptions = {}) => {
  const qc = useQueryClient();

  return useMutation({
    ...options,
    mutationKey: queryKeys.LOGOUT(),
    mutationFn: authService.logout,
    onSuccess(...args) {
      qc.setQueryData(queryKeys.SESSION(), null);

      return unref(options.onSuccess)?.(...args);
    }
  });
};

export type UseSessionOptions = TrpcQueryOptions<AuthService['getSession']>;
export const useSession = (options: UseSessionOptions = {}) => {
  return useQuery({
    ...options,
    queryKey: queryKeys.SESSION(),
    queryFn: authService.getSession
  });
};
