import { noop } from '@daria/shared';
import { db } from '../../db';
import type { UUID } from '../../utils';

export const passwordResetTokenRepo = {
  upsertByUserId: (id: UUID, value: string) =>
    db.user.update({
      where: { id },
      data: {
        passwordResetToken: {
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
    db.passwordResetToken.delete({ where: { value } }).catch(noop)
};
