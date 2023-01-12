import { helloService } from '@/api/hello';
import { queryKeys } from '@/utils/queryKeys';
import type { TrpcQueryOptions } from '@/utils/types';
import { useQuery } from '@tanstack/vue-query';

export type UseHelloOptions = TrpcQueryOptions<
  ReturnType<(typeof helloService)['hello']>
>;
export const useHello = (options: UseHelloOptions = {}) => {
  return useQuery({
    queryKey: queryKeys.HELLO(),
    queryFn: helloService.hello,
    ...options
  });
};
