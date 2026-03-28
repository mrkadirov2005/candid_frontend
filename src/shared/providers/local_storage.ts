export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    ROLE: 'user_role',
    USER_EMAIL: 'user_email',
    USER: 'user'
}
export const LOCALSTORAGE = {
    SET: (key: string, value: string) => {
        localStorage.setItem(key, value);
    },
    GET: (key: string) => {
        return localStorage.getItem(key);
    },
    REMOVE: (key: string) => {
        localStorage.removeItem(key);
    },
    CLEAR: () => {
        localStorage.clear();
    },
}