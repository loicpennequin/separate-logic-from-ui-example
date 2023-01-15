import { authRouter } from '../auth/router';
import { userRouter } from '../user/router';
import { router } from './router';

export type TrpcRouter = typeof trpcRouter;
export const trpcRouter = router({
  auth: authRouter,
  user: userRouter
});
