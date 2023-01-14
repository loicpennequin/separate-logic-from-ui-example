import type { ReactNode } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

type Props = { children: ReactNode };
export const PublicOnlyRoute = ({ children }: Props) => {
  const { data } = useSession();

  const [searchParams] = useSearchParams();

  return data ? (
    <Navigate to={searchParams.get('from') ?? '/'} replace />
  ) : (
    children
  );
};
