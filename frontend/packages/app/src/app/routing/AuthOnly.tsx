import { observer } from 'mobx-react-lite';
import { ReactNode, useState } from 'react';
import { useGetCurrentUser } from '@entities/session';

export type AuthOnlyProps = {
    children?: ReactNode;
};

function AuthOnly({ children }: AuthOnlyProps) {
    const [error, setError] = useState(null);
    const { isLoading } = useGetCurrentUser();

    if (isLoading) {
        return 'some loader';
    }

    return children;
}

export default observer(AuthOnly);
