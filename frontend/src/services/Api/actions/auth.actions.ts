import { factory } from '../HTTPClient';
import { Gender } from './types';

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

export function fetchRecoverPasswordSend(payload: fetchRecoverPasswordSendRequest): Promise<unknown> {
    return factory.createClient().post('/api/v1/auth/recover/password/send', {
        body: payload,
    });
}

export interface fetchRecoverPasswordConfirmRequest {
    email: string;
    code: string;
}

export function fetchRecoverPasswordConfirm(payload: fetchRecoverPasswordConfirmRequest): Promise<unknown> {
    return factory.createClient().post('/api/v1/auth/recover/password/confirm', {
        body: payload,
    });
}

export interface fetchRecoverPasswordUpdateRequest {
    email: string;
    password: string;
}

export function fetchRecoverPasswordUpdate(payload: fetchRecoverPasswordUpdateRequest): Promise<unknown> {
    return factory.createClient().post('/api/v1/auth/recover/password/update', {
        body: payload,
    });
}

export interface fetchRegisterRequest {
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    gender?: Gender;
    date_of_birth?: string;
    avatar_url?: string;
}

export function fetchRegister(payload: fetchRegisterRequest): Promise<unknown> {
    return factory.createClient().post('/api/v1/auth/register', {
        body: payload,
    });
}

export interface fetchRefreshResponse {
    access_token: string;
}

export function fetchRefreshTokens(): Promise<fetchRefreshResponse> {
    return factory
        .createClient()
        .post('/api/v1/auth/refresh')
        .then((res) => res.json() as Promise<fetchRefreshResponse>);
}
