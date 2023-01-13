import { db } from '../../db';
import type { UUID } from '../../utils';
import type { Prisma } from '@prisma/client';

export const userRepo = {
  findById: (id: UUID) => db.user.findUnique({ where: { id } }),

  findByEmail: (email: string) => db.user.findUnique({ where: { email } }),

  findByRefreshToken: (value: string) =>
    db.refreshToken.findUnique({ where: { value } }).user(),

  findByPasswordResetToken: (value: string) =>
    db.passwordResetToken.findUnique({ where: { value } }).user(),

  create: (data: Prisma.UserCreateInput) => {
    return db.user.create({
      data
    });
  },

  updatePasswordById: (id: UUID, passwordHash: string) => {
    return db.user.update({
      where: { id },
      data: {
        passwordHash,
        passwordResetToken: { delete: true }
      }
    });
  }
};
