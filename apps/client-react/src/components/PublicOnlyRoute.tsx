import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

export const PublicOnlyRoute: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useSession();

  const [searchParams] = useSearchParams();

  return data ? (
    <Navigate to={searchParams.get('from') ?? '/'} replace />
  ) : (
    <>{children}</>
  );
};
