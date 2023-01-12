import { noop } from '@daria/shared';
import { db } from '../../db';
import { UUID } from '../../utils';

export const refreshTokenRepo = {
  updateByUserId: (id: UUID, value: string) =>
    db.user.update({
      where: { id },
      data: {
        refreshToken: {
          upsert: {
            create: {
              value
            },
            update: {
              value
            }
          }
        }
      }
    }),

  deleteByValue: (value: string) =>
    // https://github.com/prisma/prisma/issues/4072#issuecomment-1127067981
    db.refreshToken.delete({ where: { value } }).catch(noop)
};
