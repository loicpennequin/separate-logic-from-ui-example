import z from 'zod';

export const LoginDto = z.object({
  email: z.string().email().trim(),
  password: z.string()
});
export type LoginDto = z.infer<typeof LoginDto>;

export const LoginResponse = z.object({
  accessToken: z.string()
});
export type LoginResponse = z.infer<typeof LoginResponse>;

export const LogoutResponse = z.object({
  success: z.boolean()
});
export type LogoutResponse = z.infer<typeof LogoutResponse>;

export const RefreshTokenResponse = z.object({
  accessToken: z.string()
});
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponse>;
