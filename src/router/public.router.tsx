import { authRoutes } from '#/modules/auth';
import type { RouteObject } from 'react-router';
import { GuestGuard } from './guest.guard';

export const publicRoutes: RouteObject[] = [
  {
    Component: GuestGuard,
    children: [...authRoutes],
  },
];
