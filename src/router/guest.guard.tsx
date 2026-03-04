import { Navigate, Outlet } from 'react-router';
import { useAuth } from '#/shared/providers/auth';
import { DEFAULT_REDIRECT } from '#/shared/utils/router.util';

export function GuestGuard() {
  const auth = useAuth();

  if (auth.status === 'authenticated') {
    return <Navigate to={DEFAULT_REDIRECT} replace />;
  }

  return <Outlet />;
}
