import { useCallback } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { Card, PageHeader, Switch, SwitchItem } from '../../../components/ui';
import { SettingsMain } from './SettingsMain';

const items: SwitchItem<string>[] = [
    {
        label: 'Главная',
        value: '',
    },
    {
        label: 'Личные данные',
        value: 'personal',
    },
    {
        label: 'Безопастность и вход',
        value: 'security',
    },
];

export function Settings() {
    return (
        <Card className={'h-full'}>
            <Header />
            <Routes>
                <Route path={''} element={<SettingsMain />} />
                <Route path={'personal'} element={'personal'} />
                <Route path={'security'} element={'security'} />
                <Route path={'*'} element={<Navigate to={'/panel/settings/'} />} />
            </Routes>
        </Card>
    );
}

function Header() {
    const navigate = useNavigate();

    const onChange = useCallback((value: string) => {
        navigate(`/panel/settings/${value}`);
    }, []);

    return (
        <PageHeader
            icon={<AiOutlineSetting />}
            label={'Настройки'}
            right={<Switch items={items} initActive={items[0].value} onChange={onChange} />}
        />
    );
}
