import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { endpoints } from "#/router/endpoints.backend";
import { Routes } from "#/router/routes";
import type { JWT_RESPONSE } from "#/shared/types/jwt.structure";

type AcceptInviteStudentForm = {
    firstName: string;
    lastName: string;
    password: string;
};

export function AcceptInviteStudentPage({ userData }: { userData: JWT_RESPONSE }) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<AcceptInviteStudentForm>();

    const acceptInviteMutation = useMutation({
        mutationFn: async (data: AcceptInviteStudentForm) => {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8050';
            const response = await fetch(`${baseUrl}${endpoints.students.accept_invite}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    email: userData.email,
                    userId: userData.userId,
                    universityId: userData.universityId,
                }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                throw new Error(errData?.message || 'Failed to accept invite');
            }

            return response.json();
        },
        onSuccess: () => {
            navigate(Routes.auth.login);
        }
    });

    const onSubmit = (data: AcceptInviteStudentForm) => {
        acceptInviteMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px" }}>
            <input type="email" value={userData.email} disabled style={{ padding: "0.5rem" }} />

            <div>
                <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName", { required: "First name is required" })}
                    style={{ padding: "0.5rem", width: "100%" }}
                />
                {errors.firstName && <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.firstName.message}</span>}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName", { required: "Last name is required" })}
                    style={{ padding: "0.5rem", width: "100%" }}
                />
                {errors.lastName && <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.lastName.message}</span>}
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: "Password is required" })}
                    style={{ padding: "0.5rem", width: "100%" }}
                />
                {errors.password && <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.password.message}</span>}
            </div>

            <button type="submit" disabled={acceptInviteMutation.isPending} style={{ padding: "0.5rem", cursor: "pointer" }}>
                {acceptInviteMutation.isPending ? "Submitting..." : "Accept Invite"}
            </button>
            {acceptInviteMutation.isError && <div style={{ color: "red" }}>{acceptInviteMutation.error.message}</div>}
        </form>
    );
}