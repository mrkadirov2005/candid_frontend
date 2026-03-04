import { lazy } from 'react';

export function lazyRoute<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}

const SAFE_REDIRECT_PATHS = ['/dashboard', '/courses', '/profile', '/settings'] as const;

export const DEFAULT_REDIRECT = SAFE_REDIRECT_PATHS[0];

export function getSafeRedirect(redirect: string | null): string {
  if (redirect && SAFE_REDIRECT_PATHS.some((p) => redirect.startsWith(p))) {
    return redirect;
  }
  return DEFAULT_REDIRECT;
}
