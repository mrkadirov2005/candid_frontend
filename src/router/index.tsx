import { createBrowserRouter, Outlet } from 'react-router';
import { privateRoutes } from './private.route';
import { publicRoutes } from './public.router';

export const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    Component: () => {
      return <Outlet />;
    },
    children: [...publicRoutes, ...privateRoutes],
  },
]);
