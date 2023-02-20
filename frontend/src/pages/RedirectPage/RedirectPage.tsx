import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectPageProps {
    to?: string;
}

export function RedirectPage(props: RedirectPageProps) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(props.to || '/');
    });

    return <div></div>;
}
