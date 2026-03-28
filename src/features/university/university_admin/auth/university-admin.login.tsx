import { LOCALSTORAGE, STORAGE_KEYS } from "#/shared/providers/local_storage"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { endpoints } from "#/router/endpoints.backend"
import type { Employer } from "#/features/employers/types"
import { useNavigate } from "react-router"
import { Routes } from "#/router/routes"

export function UniversityAdminLogin() {
    const email = LOCALSTORAGE.GET(STORAGE_KEYS.USER_EMAIL)
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()
    const loginMutation = useMutation({
        mutationFn: async () => {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8050';
            const response = await fetch(`${baseUrl}${endpoints.university_admin.login}`, {
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
            navigate(Routes.university_admin.Root);
        }
    });
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            loginMutation.mutate();
        }}>
            <h1>Hello admin! you are welcome</h1>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    )
}