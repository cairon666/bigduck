import React, { StrictMode, Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { store } from '../_redux';
import { Loader } from '../components/ui';

const AuthPage = lazy(() => import('../pages/AuthPage'));
const PanelPage = lazy(() => import('../pages/PanelPage'));

const router = createBrowserRouter([
    {
        path: '/auth/*',
        element: (
            <Suspense fallback={<Loader size={'large'} />}>
                <AuthPage />
            </Suspense>
        ),
    },
    {
        path: '/panel/*',
        element: (
            <Suspense fallback={<Loader size={'large'} />}>
                <PanelPage />
            </Suspense>
        ),
    },
    {
        path: '*',
        element: <Navigate to={'/auth'} />,
    },
]);

export const App = () => {
    return (
        <StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </StrictMode>
    );
};
