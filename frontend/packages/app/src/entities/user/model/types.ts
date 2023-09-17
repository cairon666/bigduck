export type Gender = 'male' | 'female';

export enum UserRoles {
    USER = 1,
    ADMIN = 2,
}

export interface User {
    id: string;
    email: string;
    is_confirmed: boolean;
    user_name: string;
    first_name: string;
    second_name: string;
    date_of_birth: Date | null;
    avatar: string | null;
    gender: Gender | null;
    create_at: Date;
    roles: UserRoles[];
    isAdmin: boolean;
}
