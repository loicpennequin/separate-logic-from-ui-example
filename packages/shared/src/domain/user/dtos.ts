import z from 'zod';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from './constants';
import { LoginResponse } from '../auth';

export const UserResponse = z.object({
  id: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date().nullable()
});

export type UserResponse = z.infer<typeof UserResponse>;

export const SignUpDto = z.object({
  email: z.string().email().trim(),
  password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH).trim()
});
export type SignUpDto = z.infer<typeof SignUpDto>;

export const SignUpResponse = LoginResponse.extend({
  user: UserResponse
});
