import { Header } from '@/pages/PanelPage/ui/Header';
import { LeftNavigationMenu } from '@/pages/PanelPage/ui/LeftNavigationMenu';
import { Outlet } from 'react-router-dom';

export function PanelPage() {
    // TODO: init user data

    return (
        <div className={'flex h-screen w-screen flex-col overflow-hidden'}>
            <Header />
            <div className={'flex h-full w-full gap-5 overflow-hidden py-5'}>
                <LeftNavigationMenu />
                <div className={'w-full pr-5'}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
