import { useSearchParams } from "react-router"
import { parseJwt } from "#/shared/providers/jwt.provider"
import AcceptInviteEmployer from "#/features/employers/auth/accept_invite.employer"
import { AcceptInviteUniversityAdminPage } from "#/features/university/university_admin/auth/accept-invite.university-admin"
import { AcceptInviteTeacherPage } from "#/features/teachers/auth/accept-invite.teacher"
import type { JWT_RESPONSE } from "#/shared/types/jwt.structure"
import { AcceptInviteStudentPage } from "#/features/students/auth/accept-invite.student"

export function AcceptInvitePage() {
    const [searchParams] = useSearchParams()
    const token: string = searchParams.get("token") as string
    const userData: JWT_RESPONSE = parseJwt(token)
    console.log(userData)


    return (
        <div>
            <h1>Hi, welcome! {userData.email}</h1>
            {userData.role == "employer"
                ? <AcceptInviteEmployer userData={userData}></AcceptInviteEmployer> : ""}
            {userData.role == "university_admin"
                ? <AcceptInviteUniversityAdminPage userData={userData}></AcceptInviteUniversityAdminPage> : ""}
            {userData.role == "teacher"
                ? <AcceptInviteTeacherPage userData={userData}></AcceptInviteTeacherPage> : ""}
            {userData.role == "student"
                ? <AcceptInviteStudentPage userData={userData}></AcceptInviteStudentPage> : ""}
        </div>
    )
}