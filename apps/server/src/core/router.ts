import { procedure, router } from '../trpc/router';

import { config } from '../config';

export const coreRouter = router({
  getFeatureFlags: procedure.query(() => {
    return config.FEATURE_FLAGS;
  })
});
