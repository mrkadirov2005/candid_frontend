import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { endpoints } from '#/router/endpoints.backend';
import { LOCALSTORAGE, STORAGE_KEYS, } from '#/shared/providers/local_storage';
import type { LOGIN_RESPONSE } from '#/types/login.types';
import { Routes } from '#/router/routes';

export function LoginUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async (data: LOGIN_RESPONSE) => {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8050';
            const response = await fetch(`${baseUrl}${endpoints.auth.login}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                throw new Error(errData?.message || 'Failed to login');
            }

            return response.json();
        },
        onSuccess: (data: LOGIN_RESPONSE) => {
            LOCALSTORAGE.SET(STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
            LOCALSTORAGE.SET(STORAGE_KEYS.ROLE, data.role);
            LOCALSTORAGE.SET(STORAGE_KEYS.USER_EMAIL, data.email)
            navigate(Routes.auth.login_password);
        }
    });

    const onSubmit = (data: any) => {
        loginMutation.mutate(data);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email.message as string}</span>}
                </div>
                {loginMutation.isError && (
                    <div style={{ color: 'red', marginTop: '10px' }}>
                        Error: {loginMutation.error?.message}
                    </div>
                )}
                <button type="submit" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </button>
                <p>Don't have an account? <a href="/auth/send_invite">Get Invite</a></p>
            </form>
        </div>
    )
}