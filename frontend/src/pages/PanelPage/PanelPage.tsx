import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from './Header';
import { Main } from './Main';

export function PanelPage() {
    return (
        <div className={'flex h-screen w-screen flex-col overflow-hidden'}>
            <Header />
            <div className={'h-full p-5'}>
                <Routes>
                    <Route path={''} element={<Main />} />
                    <Route path={'/settings'} element={<Navigate to={'/panel'} />} />
                    <Route path={'/logout'} element={<Navigate to={'/panel'} />} />
                    <Route path={'/support'} element={<Navigate to={'/panel'} />} />
                    <Route path={'/user'} element={<Navigate to={'/panel'} />} />
                    <Route path={'*'} element={<Navigate to={'/panel'} />} />
                </Routes>
            </div>
        </div>
    );
}
