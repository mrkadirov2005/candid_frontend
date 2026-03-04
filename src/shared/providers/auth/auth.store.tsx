import { create } from 'zustand';

type AuthenticatedState = {
  status: 'authenticated';
  user: {
    id: string;
    email: string;
  };
  token: string;
};

type NonAuthenticatedState = {
  status: 'guest';
  user: null;
  token: null;
};

type AuthState = AuthenticatedState | NonAuthenticatedState;

type AuthActions = {
  login: (token: string, user: { id: string; email: string }) => void;
  logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

function getInitialAuthState(): AuthState {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return { status: 'guest', user: null, token: null };
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as {
      sub: string;
      email: string;
    };
    return {
      status: 'authenticated',
      user: { id: payload.sub, email: payload.email },
      token,
    };
  } catch {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return { status: 'guest', user: null, token: null };
  }
}

export const useAuthStore = create<AuthStore>()((set) => ({
  ...getInitialAuthState(),
  login: (token, user) => {
    set({ status: 'authenticated', user, token });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ status: 'guest', user: null, token: null });
  },
}));
