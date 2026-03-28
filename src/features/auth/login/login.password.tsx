import { LoginEmployer } from "#/features/employers/auth/login.employer";
import { StudentsLoginPage } from "#/features/students/auth/login.students";
import { TeacherLoginPage } from "#/features/teachers/auth/teacher.login";
import { UniversityAdminLogin } from "#/features/university/university_admin/auth/university-admin.login";
import { LOCALSTORAGE, STORAGE_KEYS } from "#/shared/providers/local_storage";

export function LoginPassword() {
    const role = LOCALSTORAGE.GET(STORAGE_KEYS.ROLE)
    if (role === "employer") {
        return <LoginEmployer />
    }
    if (role === "university_admin") {
        return <UniversityAdminLogin />
    }
    if (role === "student") {
        return <StudentsLoginPage />
    }
    if (role === "teacher") {
        return <TeacherLoginPage />
    }
    return (
        <div>

        </div>
    )
}