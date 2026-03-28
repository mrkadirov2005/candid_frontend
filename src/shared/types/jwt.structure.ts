import type { UserRoleType } from "./user.types";

export interface JWT_RESPONSE {
    email: string,
    role: UserRoleType,
    userId: string,
    universityId?: string
    adminId?: string
}