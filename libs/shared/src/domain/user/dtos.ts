import z from 'zod';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from './constants';
import { LoginResponse } from '../auth';
import { DefaultResponse } from '../../types';

export const UserResponse = z.object({
  id: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  tosAcceptedAt: z.date().nullable(),
  verifiedAt: z.date().nullable()
});

export type UserResponse = z.infer<typeof UserResponse>;

export const SignUpDto = z.object({
  email: z.string().email().trim(),
  password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH).trim(),
  tosAcceptedAt: z.date().optional()
});
export type SignUpDto = z.infer<typeof SignUpDto>;
export const SignUpResponse = z.object({
  user: UserResponse,
  accessToken: z.string().optional()
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

export const SendVerificationEmailDto = z.object({
  email: z.string().email()
});
export type SendVerificationEmailDto = z.infer<typeof SendVerificationEmailDto>;
export const SendVerificationEmailResponse = DefaultResponse;
export type SendVerificationEmailEmailResponse = DefaultResponse;

export const VerifyEmailDto = z.object({
  token: z.string()
});
export type VerifyEmailDto = z.infer<typeof VerifyEmailDto>;
export const VerifyEmailResponse = LoginResponse;
export type VerifyEmailResponse = LoginResponse;
