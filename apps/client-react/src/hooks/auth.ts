import type { AuthService } from '@daria/sdk';
import { queryKeys } from '@/utils/queryKeys';
import type {
  ApiClientMutationOptions,
  ApiClientQueryOptions
} from '@/utils/types';

export type UseLoginOptions = ApiClientMutationOptions<AuthService['login']>;
export const useLogin = (options: UseLoginOptions = {}) => {
  const qc = useQueryClient();
  const { authService } = useApiClient();

  return useMutation({
    ...options,
    mutationKey: queryKeys.LOGIN(),
    mutationFn: authService.login,
    onSuccess(...args) {
      qc.refetchQueries({ queryKey: queryKeys.SESSION() });

      return options.onSuccess?.(...args);
    }
  });
};

export type UseLogoutOptions = ApiClientMutationOptions<AuthService['logout']>;
export const useLogout = (options: UseLogoutOptions = {}) => {
  const qc = useQueryClient();
  const { authService } = useApiClient();

  return useMutation({
    ...options,
    mutationKey: queryKeys.LOGOUT(),
    mutationFn: authService.logout,
    onSuccess(...args) {
      qc.setQueryData(queryKeys.SESSION(), null);

      return options.onSuccess?.(...args);
    }
  });
};

export type UseSessionOptions = ApiClientQueryOptions<
  AuthService['getSession']
>;
export const useSession = (options: UseSessionOptions = {}) => {
  const { authService } = useApiClient();

  const query = useQuery({
    ...options,
    queryKey: queryKeys.SESSION(),
    queryFn: authService.getSession
  });

  return query;
};
