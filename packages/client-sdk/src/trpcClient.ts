import type { TrpcRouter } from '@daria/server';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { httpService } from './httpService';

export type TrpcClient = ReturnType<typeof createTrpcClient>;
export const createTrpcClient = (apiUrl: string) => {
  return createTRPCProxyClient<TrpcRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: apiUrl,
        fetch: httpService.trpcFetch
      })
    ]
  });
};
