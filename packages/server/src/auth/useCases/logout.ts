import { refreshTokenRepo } from '../repositories/refreshToken';

export const logoutUseCase = (refreshToken: string) => {
  return refreshTokenRepo.deleteByValue(refreshToken);
};
