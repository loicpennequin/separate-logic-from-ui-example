import { queryKeys } from '@/utils/queryKeys';
import type {
  ApiClientMutationOptions,
  ApiClientQueryOptions
} from '@/utils/types';
import type { TosService } from '@daria/shared/src/client/tosService';

export type UseLatestTosOptions = ApiClientQueryOptions<
  TosService['getLatest']
>;
export const useLatestTos = (options: UseLatestTosOptions = {}) => {
  const api = useApi();

  return useQuery({
    ...options,
    queryKey: queryKeys.LATEST_TOS(),
    queryFn: api.tosService.getLatest
  });
};

export type UseAcceptTosOptions = ApiClientMutationOptions<
  TosService['accept']
>;
export const useAcceptTos = (options: UseAcceptTosOptions = {}) => {
  const api = useApi();

  return useMutation({
    ...options,
    mutationKey: queryKeys.ACCEPT_TOS(),
    mutationFn: api.tosService.accept
  });
};
