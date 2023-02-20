import { Outlet } from 'react-router-dom';

export function AuthPage() {
    return (
        <div className={'h-screen w-screen overflow-hidden'}>
            <div className={'flex h-full items-center justify-center overflow-y-auto'}>
                <Outlet />
            </div>
        </div>
    );
}
