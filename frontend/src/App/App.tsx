import './App.scss';

import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { store } from '../_redux';
import { AuthPage, LoginPage, RegisterPage } from '../pages/AuthPage';
import { RedirectPage } from '../pages/RedirectPage';

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthPage />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: '',
                element: <RedirectPage to={'/auth/login'} />,
            },
        ],
    },
    {
        path: '/panel',
        // element: <RedirectPage to={'/auth'} />,
    },
    {
        path: '*',
        element: <RedirectPage to={'/auth'} />,
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
