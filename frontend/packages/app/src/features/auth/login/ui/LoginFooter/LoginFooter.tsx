import { Link } from 'react-router-dom';
import { routerPaths } from '@shared/routeHistory';

export function LoginFooter() {
    return (
        <p className="align-center flex justify-between text-center text-sm font-light">
            <Link className="hover:underline" to={routerPaths.recoverPassword}>
                Востановить пароль
            </Link>
            <Link className="hover:underline" to={routerPaths.register}>
                Зарегистрироваться
            </Link>
        </p>
    );
}
