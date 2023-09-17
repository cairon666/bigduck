export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    id_user: string;
    access_token: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    user_name: string;
    gender: string | null;
    date_of_birth: Date | null;
    avatar_url: string | null;
}

export interface RefreshResponse {
    access_token: string;
}

export interface RecoverSendRequest {
    email: string;
}

export interface RecoverConfirmRequest {
    email: string;
    code: string;
}

export interface RecoverUpdateRequest {
    email: string;
    password: string;
}
