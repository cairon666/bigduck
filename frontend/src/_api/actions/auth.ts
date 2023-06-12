import { factory } from '../HTTPClient';

export interface fetchLoginRequest {
    email: string;
    password: string;
}

export interface fetchLoginResponse {
    id_user: string;
    access_token: string;
}

export function fetchLogin(payload: fetchLoginRequest): Promise<fetchLoginResponse> {
    return factory
        .createClient()
        .post('/api/v1/auth/login', {
            body: payload,
        })
        .then((res) => res.json() as Promise<fetchLoginResponse>);
}

export interface fetchRecoverPasswordSendRequest {
    email: string;
}

export function fetchRecoverPasswordSend(payload: fetchRecoverPasswordSendRequest): Promise<void> {
    return factory
        .createClient()
        .post('/api/v1/auth/recover/password/send', {
            body: payload,
        })
        .then(() => {
            return;
        });
}

export interface fetchRecoverPasswordConfirmRequest {
    email: string;
    code: string;
}

export function fetchRecoverPasswordConfirm(payload: fetchRecoverPasswordConfirmRequest): Promise<void> {
    return factory
        .createClient()
        .post('/api/v1/auth/recover/password/confirm', {
            body: payload,
        })
        .then(() => {
            return;
        });
}

export interface fetchRecoverPasswordUpdateRequest {
    email: string;
    password: string;
}

export function fetchRecoverPasswordUpdate(payload: fetchRecoverPasswordUpdateRequest): Promise<void> {
    return factory
        .createClient()
        .post('/api/v1/auth/recover/password/update', {
            body: payload,
        })
        .then(() => {
            return;
        });
}

export interface fetchRegisterRequest {
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    gender?: 'male' | 'female';
    date_of_birth?: string;
    avatar_url?: string;
}

export function fetchRegister(payload: fetchRegisterRequest): Promise<void> {
    return factory
        .createClient()
        .post('/api/v1/auth/register', {
            body: payload,
        })
        .then(() => {
            return;
        });
}
