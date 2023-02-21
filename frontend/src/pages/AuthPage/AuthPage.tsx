import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Register } from './Register';

export function AuthPage() {
    return (
        <div className={'h-screen w-screen overflow-hidden'}>
            <div className={'flex h-full items-center justify-center overflow-y-auto'}>
                <div className={'w-1/6  min-w-[300px] rounded bg-white px-4 py-6 shadow-md'}>
                    <Routes>
                        <Route path={'/login'} element={<Login />} />
                        <Route path={'/register'} element={<Register />} />
                        <Route path={'*'} element={<Navigate to={'/auth/login'} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
