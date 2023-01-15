import z from 'zod';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from './constants';
import { LoginResponse } from '../auth';
import { DefaultResponse } from '../../types';

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
export type SignUpResponse = z.infer<typeof SignUpResponse>;

export const SendPasswordResetEmailDto = z.object({
  email: z.string().email()
});
export type SendPasswordResetEmailDto = z.infer<
  typeof SendPasswordResetEmailDto
>;
export const SendPasswordResetEmailResponse = DefaultResponse;
export type SendPasswordResetEmailResponse = DefaultResponse;

export const ResetPasswordDto = z.object({
  token: z.string(),
  password: z.string()
});
export type ResetPasswordDto = z.infer<typeof ResetPasswordDto>;
export const ResetPasswordResponse = DefaultResponse;
export type ResetPasswordResponse = DefaultResponse;
