export const queryKeys = {
  SESSION: () => ['session'],
  LOGIN: () => ['login'],
  LOGOUT: () => ['logout'],
  SIGNUP: () => ['signup'],
  LOST_PASSWORD: () => ['lostPassword'],
  RESET_PASSWORD: () => ['resetPassword'],
  FEATURE_FLAGS: () => ['featureflags']
} as const;
