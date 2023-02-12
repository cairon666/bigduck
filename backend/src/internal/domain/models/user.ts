export interface User {
    id: string;
    username: string;
    first_name: string;
    second_name: string;
    avatar_url: string | null;
    day_of_birth: Date | null;
    gender: string | null;
}

export interface Credential {
    id: string,
    login: string,
    password_hash: string,
    is_staff: boolean,
    is_admin: boolean,
    phone: string | null,
    email: string,
}

