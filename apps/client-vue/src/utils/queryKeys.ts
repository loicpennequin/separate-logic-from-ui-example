export const queryKeys = {
  SESSION: () => ['session'],
  LOGIN: () => ['login'],
  LOGOUT: () => ['logout'],
  SIGNUP: () => ['signup'],
  LOST_PASSWORD: () => ['lostPassword'],
  RESET_PASSWORD: () => ['resetPassword'],
  FEATURE_FLAGS: () => ['featureflags'],
  LATEST_TOS: () => ['tos'],
  ACCEPT_TOS: () => ['tos'],
  VERIFY_EMAIL: () => ['verifyEmail'],
  SEND_VERIFY_EMAIL: () => ['sendVerifyEmail']
} as const;
