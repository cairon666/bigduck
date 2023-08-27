import {
    LoginForm,
    RecoverPasswordConfirmForm,
    RecoverPasswordLayout,
    RecoverPasswordSendForm,
    RecoverPasswordUpdateForm,
    RegisterForm,
} from '@/features/auth-forms';
import { AuthPage } from '@/pages/AuthPage';
import { ForTestPage } from '@/pages/ForTestPage';
import { Navigate, Route, Routes } from 'react-router-dom';

// {
//     path: "/panel",
//     element: <PanelPage />,
//     children: [
//         {
//             path: "",
//             index: true,
//             element: null,
//         },
//         {
//             path: "/setting",
//             element: null,
//             children: [
//                 {
//                     path: "",
//                     index: true,
//                     element: null,
//                 },
//                 {
//                     path: "/personal",
//                     element: null,
//                 },
//                 {
//                     path: "/recover/security",
//                     element: null,
//                 },
//             ],
//         },
//         {
//             path: "/support",
//             element: null,
//         },
//     ],
// },

export function AppRouter() {
    return (
        <Routes>
            <Route path={'/auth'} element={<AuthPage />}>
                <Route path={'login'} element={<LoginForm />} />
                <Route path={'register'} element={<RegisterForm />} />
                <Route path={'recover'} element={<RecoverPasswordLayout />}>
                    <Route index path={'send'} element={<RecoverPasswordSendForm />} />
                    <Route path={'confirm'} element={<RecoverPasswordConfirmForm />} />
                    <Route path={'update'} element={<RecoverPasswordUpdateForm />} />
                    <Route path={''} element={<Navigate to={'send'} />} />
                </Route>
                <Route path={''} element={<Navigate to={'login'} />} />
            </Route>
            <Route path={''} element={<ForTestPage />} />
            <Route path={'*'} element={<Navigate to={'/auth'} />} />
        </Routes>
    );
}
