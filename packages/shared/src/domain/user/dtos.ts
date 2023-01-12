import z from 'zod';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from './constants';

export const UserResponse = z.object({
  id: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date().nullable()
});

export type UserResponse = z.infer<typeof UserResponse>;

export const CreateUserDto = z.object({
  email: z.string().email().trim(),
  password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH).trim()
});
export type CreateUserDto = z.infer<typeof CreateUserDto>;
