import { Outlet } from 'react-router-dom';

export function AuthPage() {
    return (
        <div className={'h-screen w-screen overflow-hidden'}>
            <div className={'flex h-full items-center justify-center overflow-y-auto'}>
                <div className={'w-1/6 min-w-[300px] rounded bg-white px-4 py-6 shadow-md'}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
