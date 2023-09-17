import { useMutation } from 'react-query';
import { AuthService } from '@shared/api';
import routeHistory, { routerPaths } from '@shared/routeHistory';
import { RegisterFormScheme } from '../model';

export interface usePostRegisterProps {
    onError?: (errir: unknown) => void;
}

export function usePostRegister({ onError }: usePostRegisterProps) {
    return useMutation(
        (form: RegisterFormScheme) => {
            return AuthService.register({
                email: form.email,
                password: form.password,
                first_name: form.first_name,
                second_name: form.second_name,
                user_name: form.user_name,
                gender: form.gender || null,
                date_of_birth: form.date_of_birth || null,
                avatar_url: form.avatar_url || null,
            });
        },
        {
            onError,
            onSuccess: (_, form) => {
                routeHistory.push(routerPaths.loginWithParams(form.email, form.password));
            },
        },
    );
}
