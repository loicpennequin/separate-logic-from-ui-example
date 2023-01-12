import { db } from '../../db';
import { UUID } from '../../utils';
import { Prisma } from '@prisma/client';

export const userRepo = {
  findById: (id: UUID) => db.user.findUnique({ where: { id } }),

  findByEmail: (email: string) => db.user.findUnique({ where: { email } }),

  findByRefreshToken: (value: string) =>
    db.refreshToken.findUnique({ where: { value } }).user(),

  create: (data: Prisma.UserCreateInput) => {
    return db.user.create({
      data
    });
  }
};
