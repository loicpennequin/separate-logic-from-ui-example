import { db } from '../../db';
import type { UUID } from '../../utils';

export const tosRepo = {
  findLatest: () =>
    db.termsOfServiceHistory.findFirst({
      orderBy: {
        updatedAt: 'desc'
      }
    }),

  acceptTos: (userId: UUID) => {
    return db.user.update({
      where: { id: userId },
      data: {
        tosAcceptedAt: new Date()
      }
    });
  }
};
