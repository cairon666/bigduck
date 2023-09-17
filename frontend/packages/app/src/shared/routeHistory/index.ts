import { createBrowserHistory } from 'history';

export const routerPaths = {
    auth: '/auth',
    login: '/auth/login',
    loginWithParams: (email: string, password: string) => `/auth/login?email=${email}&password=${password}`,
    register: '/auth/register',
    recoverPassword: '/auth/recover',
    panel: '/panel',
    default: '',
};

const routeHistory = createBrowserHistory({
    window,
});

export default routeHistory;
