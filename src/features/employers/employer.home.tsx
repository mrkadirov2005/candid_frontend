import { LOCALSTORAGE, STORAGE_KEYS } from "#/shared/providers/local_storage";
import type { Employer } from "./types";

export function EmployerHome() {
    const raw = LOCALSTORAGE.GET(STORAGE_KEYS.USER);
    const employer: Employer | null = raw ? JSON.parse(raw) : null;

    return (
        <div>
            <h1>Welcome, {employer?.name ?? employer?.email}</h1>
            <p>Company: {employer?.company}</p>
        </div>
    );
}
