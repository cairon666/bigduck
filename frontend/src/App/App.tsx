import './App.scss';

import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthPage, Login, Register } from '../pages/AuthPage';
import NotFoundPage from '../pages/NotFoundPage';
import { PanelPage } from '../pages/PanelPage';
import RootPage from '../pages/RootPage';
import { store } from '../redux/store';

const routerConfig = [
    {
        path: '/',
        element: <RootPage />,
    },
    {
        path: '/auth',
        element: <AuthPage />,
        children: [
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'login',
                element: <Login />,
            },
        ],
    },

    {
        path: '/panel',
        element: <PanelPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];

const router = createBrowserRouter(routerConfig);

export const App = () => {
    return (
        <StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </StrictMode>
    );
};
