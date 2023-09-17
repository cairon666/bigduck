import { Link } from 'react-router-dom';
import { AppErrorCodes } from '@shared/api';
import { routerPaths } from '@shared/routeHistory';
import { Info } from '@shared/uikit';

export interface LoginErrorProps {
    error?: AppErrorCodes | null;
}

export function LoginError({ error }: LoginErrorProps) {
    switch (error) {
        case AppErrorCodes.CodeBadPassword:
            return (
                <Info type="danger" as="p" className="flex flex-col items-center p-2">
                    <span>Вы ввели неверный пароль! </span>
                    <Link className="underline" to={routerPaths.recoverPassword}>
                        Забыли пароль?
                    </Link>
                </Info>
            );
        case AppErrorCodes.CodeNotFound:
            return (
                <Info type="danger" as="p" className="flex flex-col items-center p-2">
                    <span>Пользователь не найден! </span>
                    <Link className="underline" to={routerPaths.register}>
                        Зарегестрироваться?
                    </Link>
                </Info>
            );
        case undefined:
        case null:
        default:
            return null;
    }
}
