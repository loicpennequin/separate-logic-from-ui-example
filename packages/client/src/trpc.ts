import type { TrpcRouter } from '@daria/server';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { httpService } from './api/http';

export const trpcClient = createTRPCProxyClient<TrpcRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL,
      fetch: httpService.trpcFetch
    })
  ]
});
