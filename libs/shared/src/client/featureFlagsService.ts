import type { TrpcClient } from './trpcClient';

export type FeatureFlagService = ReturnType<typeof createFeatureFlagService>;

export const createFeatureFlagService = (trpcClient: TrpcClient) => {
  return {
    getAll() {
      return trpcClient.core.getFeatureFlags.query();
    }
  };
};
