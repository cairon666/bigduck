import { useMutation } from 'react-query';
import { AuthService, LoginResponse } from '@shared/api/AuthService';
import routeHistory, { routerPaths } from '@shared/routeHistory';
import storage from '@shared/storage';
import { LoginFormScheme } from '../model';

export interface usePostLoginProps {
    onSuccess?: (data: LoginResponse) => void;
    onError?: (error: unknown) => void;
}

export function usePostLogin({ onSuccess, onError }: usePostLoginProps) {
    return useMutation(
        (form: LoginFormScheme) => {
            return AuthService.login({
                email: form.email,
                password: form.password,
            });
        },
        {
            onError,
            onSuccess: (data) => {
                storage.accessToken.token = data.access_token;
                storage.userId.id = data.id_user;
                routeHistory.push(routerPaths.panel);
            },
        },
    );
}
