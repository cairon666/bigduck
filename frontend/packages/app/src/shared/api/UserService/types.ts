export interface getUserDataResponseDTO {
    id: string;
    email: string;
    is_confirmed: boolean;
    user_name: string;
    first_name: string;
    second_name: string;
    date_of_birth: Date | null;
    avatar: string | null;
    gender: string | null;
    create_at: Date;
    roles: number[];
}
