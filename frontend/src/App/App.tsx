import React, { StrictMode, useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Link,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import './App.scss';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import NotFoundPage from '../pages/NotFoundPage';
import RootPage from '../pages/RootPage';
import PanelPage from '../pages/PanelPage';
import AuthPage from '../pages/AuthPage';
import Login from '../pages/AuthPage/Login';
import Register from '../pages/AuthPage/Register';

const routerConfig: RouteObject[] = [
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
