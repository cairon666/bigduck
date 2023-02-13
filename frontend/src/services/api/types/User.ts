export interface User {
    id: string;
    username: string;
    first_name: string;
    second_name: string;
    avatar_url: string | null;
    day_of_birth: Date | null;
    gender: string | null;
}
