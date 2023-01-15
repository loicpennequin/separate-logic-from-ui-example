import type { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useSession();
  const location = useLocation();

  return data ? (
    <>{children}</>
  ) : (
    <Navigate to={`/login?from=${location.pathname}`} replace />
  );
};
