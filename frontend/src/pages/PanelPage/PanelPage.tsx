import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from './Header';
import { LeftNavigationMenu } from './LeftNavigationMenu';
import Main from './Main';
import Settings from './Settings';
import Support from './Support';
import User from './User';

export function PanelPage() {
    return (
        <div className={'flex h-screen w-screen flex-col overflow-hidden'}>
            <Header />
            <div className={'flex h-full w-full gap-5 overflow-hidden py-5'}>
                <LeftNavigationMenu />
                <div className={'w-full pr-5'}>
                    <Routes>
                        <Route path={''} element={<Main />} />
                        <Route path={'settings/*'} element={<Settings />} />
                        <Route path={'support/*'} element={<Support />} />
                        <Route path={'user/*'} element={<User />} />
                        <Route path={'*'} element={<Navigate to={'/panel'} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
