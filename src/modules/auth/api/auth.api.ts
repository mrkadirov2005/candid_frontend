import { apiClient } from '#/shared/lib/api-client';
import type { LoginRequest, LoginResponse } from '../types';
import { endpoints } from './endpoints';

export const authApi = {
  login: (data: LoginRequest) => apiClient.post<LoginResponse>(endpoints.login, data),
};
