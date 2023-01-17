import { procedure, router } from '../trpc/router';

import { config } from '../config';
import { tosRepo } from './repositories/tos';

export const coreRouter = router({
  getFeatureFlags: procedure.query(() => {
    return config.FEATURE_FLAGS;
  }),

  getLatestTos: procedure.query(() => {
    return tosRepo.findLatest();
  }),

  acceptTos: procedure
    .meta({ needsAuth: true })
    .query(({ ctx }) => tosRepo.acceptTos(ctx.session!.id))
});
