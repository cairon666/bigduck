import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuthToken } from '../../di/api-client';
import { PanelHeader } from './PanelHeader';

export const PanelPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        getAuthToken().then((token) => {
            if (!token) {
                navigate('/auth/login');
            }
        });
    }, []);

    return (
        <div className='flex h-screen w-screen flex-col overflow-hidden'>
            <PanelHeader />
            <div>123</div>
        </div>
    );
};
