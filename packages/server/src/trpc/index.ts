import { authRouter } from '../auth/router';
import { router } from './router';

export type TrpcRouter = typeof trpcRouter;
export const trpcRouter = router({
  auth: authRouter
});
