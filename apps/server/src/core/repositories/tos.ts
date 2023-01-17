import { db } from '../../db';

export const tosRepo = {
  findLatest: () =>
    db.termsOfServiceHistory.findFirst({
      orderBy: {
        updatedAt: 'desc'
      }
    })
};
