import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type Props = { children: ReactNode };
export const ProtectedRoute = ({ children }: Props) => {
  const { data } = useSession();
  const location = useLocation();

  return data ? (
    children
  ) : (
    <Navigate to={`/login?from=${location.pathname}`} replace />
  );
};
