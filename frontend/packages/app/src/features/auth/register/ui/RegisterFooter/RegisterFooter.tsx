import { Link } from 'react-router-dom';
import { routerPaths } from '@shared/routeHistory';

export function RegisterFooter() {
    return (
        <p className="mt-1 text-center text-sm font-light">
            <span>Уже есть аккаунт? </span>
            <Link className="text-yellow-500 hover:underline" to={routerPaths.login}>
                Войти
            </Link>
        </p>
    );
}
