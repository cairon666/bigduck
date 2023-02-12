import { Outlet } from 'react-router-dom';
import Card from '../../components/ui/Card';

export const AuthPage = () => {
    return (
        <div className={'w-screen h-screen flex items-center p-2'}>
            <Card
                className={
                    'w-full max-w-lg flex flex-col items-center p-4 m-auto'
                }
            >
                <Outlet />
            </Card>
        </div>
    );
};
