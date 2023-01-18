import type { TrpcClient } from './trpcClient';

export type TosService = ReturnType<typeof createTosService>;

export const createTosService = (trpcClient: TrpcClient) => {
  return {
    getLatest() {
      return trpcClient.core.getLatestTos.query();
    },
    accept() {
      return trpcClient.core.acceptTos.mutate();
    }
  };
};
