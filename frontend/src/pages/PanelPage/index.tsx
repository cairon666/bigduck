import { memo, useEffect } from 'react';
import { getAuthToken } from '../../di/api-client';
import { useNavigate } from 'react-router-dom';

const PanelPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        getAuthToken().then((token) => {
            if (!token) {
                navigate('/auth/login');
            }
        });
    }, []);

    return <div>panel page</div>;
};

export default PanelPage;
