import { queryKeys } from '@/utils/queryKeys';

export const useFeatureFlags = () => {
  const api = useApiClient();

  return useQuery({
    queryKey: queryKeys.FEATURE_FLAGS(),
    queryFn: api.featureFlagservice.getAll,
    staleTime: Infinity
  });
};
