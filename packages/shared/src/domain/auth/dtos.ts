import z from 'zod';
import { DefaultResponse } from '../../types';

export const LoginDto = z.object({
  email: z.string().email().trim(),
  password: z.string()
});
export type LoginDto = z.infer<typeof LoginDto>;

export const LoginResponse = z.object({
  accessToken: z.string()
});
export type LoginResponse = z.infer<typeof LoginResponse>;

export const LogoutResponse = DefaultResponse;
export type LogoutResponse = DefaultResponse;

export const RefreshTokenResponse = z.object({
  accessToken: z.string()
});
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponse>;
