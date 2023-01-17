import type { TrpcClient } from './trpcClient';

export type TosService = ReturnType<typeof createTosService>;

export const createTosService = (trpcClient: TrpcClient) => {
  return {
    getLatest() {
      return trpcClient.core.getLatestTos.query();
    }
  };
};
