import { endpoints } from "#/router/endpoints.backend";
import { LOCALSTORAGE, STORAGE_KEYS } from "#/shared/providers/local_storage"
import type { LOGIN_RESPONSE } from "#/types/login.types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import type { Employer } from "../types";
import { Routes } from "#/router/routes";
import { useNavigate } from "react-router";

export function LoginEmployer() {
    const email = LOCALSTORAGE.GET(STORAGE_KEYS.USER_EMAIL)
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()
    const loginMutation = useMutation({
        mutationFn: async () => {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8050';
            const response = await fetch(`${baseUrl}${endpoints.employer.login}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                throw new Error(errData?.message || 'Failed to login');
            }

            return response.json();
        },
        onSuccess: (data: Employer) => {
            LOCALSTORAGE.SET(STORAGE_KEYS.USER_EMAIL, data.email)
            LOCALSTORAGE.SET(STORAGE_KEYS.USER, JSON.stringify(data))
            navigate(Routes.employers.Root);
        }
    });
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            loginMutation.mutate();
        }}>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    )
}