import { Outlet } from 'react-router-dom';

import { Card } from '../../components/ui';

export const AuthPage = () => {
    return (
        <div className={'flex h-screen w-screen items-center p-2'}>
            <Card className={'m-auto flex w-full max-w-lg flex-col items-center p-4'}>
                <Outlet />
            </Card>
        </div>
    );
};
