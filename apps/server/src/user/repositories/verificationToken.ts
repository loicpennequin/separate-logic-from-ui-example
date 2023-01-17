import { noop } from '@daria/shared';
import { db } from '../../db';
import type { UUID } from '../../utils';

export const verificationTokenRepo = {
  upsertByUserId: (id: UUID, value: string) =>
    db.user.update({
      where: { id },
      data: {
        verificationToken: {
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
    db.verificationToken.delete({ where: { value } }).catch(noop)
};
