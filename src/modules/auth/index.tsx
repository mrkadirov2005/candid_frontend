import type { RouteObject } from 'react-router';
import { LoginRoute } from './routes/login.route';
import { AcceptInviteRoute } from './routes/accept-invite.route';
import { ForgotPasswordRoute } from './routes/forgot-password.route';
import { ResendInviteRoute } from './routes/resend-invite.route';

export const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginRoute />,
  },
  {
    path: 'accept-invite',
    element: <AcceptInviteRoute />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPasswordRoute />,
  },
  {
    path: 'resend-invite',
    element: <ResendInviteRoute />,
  },
];
