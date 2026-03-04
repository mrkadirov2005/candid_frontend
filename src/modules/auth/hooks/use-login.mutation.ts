import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import type { LoginRequest } from '../types';
import { useAuthStore } from '#/shared/providers/auth';

export function useLoginMutation() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);

      useAuthStore.getState().login(data.accessToken, data.user);
    },
  });
}
