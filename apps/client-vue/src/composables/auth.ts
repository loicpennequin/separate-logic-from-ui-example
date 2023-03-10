import type { AuthService } from '@daria/shared';
import { queryKeys } from '@/utils/queryKeys';
import type {
  ApiClientMutationOptions,
  ApiClientQueryOptions
} from '@/utils/types';

export type UseLoginOptions = ApiClientMutationOptions<AuthService['login']>;
export const useLogin = (options: UseLoginOptions = {}) => {
  const qc = useQueryClient();
  const { authService } = useApi();

  return useMutation({
    ...options,
    mutationKey: queryKeys.LOGIN(),
    mutationFn: authService.login,
    onSuccess(...args) {
      qc.refetchQueries({ queryKey: queryKeys.SESSION() });

      return unref(options.onSuccess)?.(...args);
    }
  });
};

export type UseLogoutOptions = ApiClientMutationOptions<AuthService['logout']>;
export const useLogout = (options: UseLogoutOptions = {}) => {
  const qc = useQueryClient();
  const { authService } = useApi();

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

export type UseSessionOptions = ApiClientQueryOptions<
  AuthService['getSession']
>;
export const useSession = (options: UseSessionOptions = {}) => {
  const { authService } = useApi();

  return useQuery({
    ...options,
    queryKey: queryKeys.SESSION(),
    queryFn: authService.getSession
  });
};

export const useAuthGuard = () => {
  const { authService } = useApi();
  const router = useRouter();
  const route = useRoute();

  const { data: session } = useSession();

  router.beforeEach((to, from, next) => {
    const jwt = authService.token;

    if (to.meta.needsAuth && !jwt) {
      return next({ name: 'Login', query: { from: to.fullPath } });
    }
    if (to.meta.publicOnly && jwt) {
      return next((from.query.from as string) ?? '/');
    }

    return next();
  });

  watchEffect(() => {
    if (route.meta.needsAuth && !session.value)
      router.push({ name: 'Login', query: { from: route.fullPath } });
    if (route.meta.publicOnly && session.value) {
      router.push((route.query.from as string) ?? '/');
    }
  });
};
