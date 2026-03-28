export const endpoints = {
    auth: {
        login: "/auth/login",
        send_invite: "/auth/send_invite"
    },
    teachers: {
        root: "/teacher",
        login: '/teacher/login',
        accept_invite: "/teacher"
    },
    employer: {
        root: "/employer",
        login: '/employer/login',
        accept_invite: '/employer'
    },
    students: {
        root: "/student",
        login: '/student/login',
        accept_invite: '/student'
    },
    university_admin: {
        root: "/university_admin",
        login: '/university_admin/login',
        accept_invite: "/university_admin/create"
    }
}