import { Routes, Route, Navigate } from 'react-router-dom';
import { routerPaths } from '@shared/routeHistory';
import { LoginForm } from '@features/auth/login';
import { RecoverPasswordForm } from '@features/auth/recoverPassword';
import { RegisterForm } from '@features/auth/register';
import { AuthPage } from '@pages/auth';

export function AppRouting() {
    return (
        <Routes>
            <Route path={routerPaths.auth} element={<AuthPage />}>
                <Route path={routerPaths.login} element={<LoginForm />} />
                <Route path={routerPaths.register} element={<RegisterForm />} />
                <Route path={routerPaths.recoverPassword} element={<RecoverPasswordForm />} />
                <Route path={routerPaths.default} element={<Navigate to={routerPaths.login} />} />
            </Route>
            <Route path={routerPaths.default} element={<Navigate to={routerPaths.auth} />} />
        </Routes>
    );
}
