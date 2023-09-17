import BaseProvider from '../BaseProvider';
import {
    LoginRequest,
    LoginResponse,
    RecoverConfirmRequest,
    RecoverSendRequest,
    RecoverUpdateRequest,
    RefreshResponse,
    RegisterRequest,
} from './types';

export class AuthService {
    static login(data: LoginRequest) {
        return BaseProvider.fetch('POST', '/api/v1/auth/login', {
            body: data,
        }).then((resp) => resp.json() as Promise<LoginResponse>);
    }

    static register(data: RegisterRequest) {
        return BaseProvider.fetch('POST', '/api/v1/auth/register', {
            body: {
                ...data,
                date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString() : null,
            },
        });
    }

    static refresh() {
        return BaseProvider.fetch('POST', '/api/v1/auth/register').then(
            (resp) => resp.json() as Promise<RefreshResponse>,
        );
    }

    static logout() {
        return BaseProvider.fetch('POST', '/api/v1/auth/logout');
    }

    static recoverSend(data: RecoverSendRequest) {
        return BaseProvider.fetch('POST', '/api/v1/auth/recover/password/send', {
            body: data,
        });
    }

    static recoverConfirm(data: RecoverConfirmRequest) {
        return BaseProvider.fetch('POST', '/api/v1/auth/recover/password/confirm', {
            body: data,
        });
    }

    static recoverUpdate(data: RecoverUpdateRequest) {
        return BaseProvider.fetch('POST', '/api/v1/auth/recover/password/update', {
            body: data,
        });
    }
}
