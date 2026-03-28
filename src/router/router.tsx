import { LoginUser } from "#/features/auth/login/login.user";
import { BrowserRouter, Routes, Route } from "react-router";
import { Routes as rts } from "./routes"
import { LoginPassword } from "#/features/auth/login/login.password";
import { EmployerHome } from "#/features/employers/employer.home";
import { StudentsHomePage } from "#/features/students/students.home";
import { UniversityAdminLogin } from "#/features/university/university_admin/auth/university-admin.login";
import { UniversityAdminPage } from "#/features/university/university_admin/universityAdmin.home";
import { StudentsLoginPage } from "#/features/students/auth/login.students";
import { TeacherHomePage } from "#/features/teachers/teachers-home.page";
import { TeacherLoginPage } from "#/features/teachers/auth/teacher.login";
import { AcceptInvitePage } from "#/features/auth/accept_invite/accept_invite.auth";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={rts.auth.login} element={<LoginUser />} />
                <Route path={rts.auth.login_password} element={<LoginPassword />} />
                <Route path={rts.employers.Root} element={<EmployerHome />} />
                <Route path={rts.students.login} element={<StudentsHomePage />} />
                <Route path={rts.university.login} element={<UniversityAdminLogin />} />
                <Route path={rts.university_admin.Root} element={<UniversityAdminPage />} />
                <Route path={rts.university_admin.login} element={<UniversityAdminLogin />} />
                {/* for students */}
                <Route path={rts.students.Root} element={<StudentsHomePage />} />
                <Route path={rts.students.login} element={<StudentsLoginPage />} />
                {/* for teachers */}
                <Route path={rts.teachers.Root} element={<TeacherHomePage />} />
                <Route path={rts.teachers.login} element={<TeacherLoginPage />} />
                {/* for accept invite */}
                <Route path={rts.auth.accept_invite} element={<AcceptInvitePage />} />
            </Routes>
        </BrowserRouter>
    )

}