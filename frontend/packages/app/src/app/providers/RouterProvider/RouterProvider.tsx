import { Update } from 'history';
import { useState, useLayoutEffect } from 'react';
import { Router } from 'react-router-dom';
import routeHistory from '@shared/routeHistory';

export type RouterProviderProps = {
    basename?: string;
    children?: React.ReactNode;
};

export function RouterProvider({ children, basename }: RouterProviderProps) {
    const [historyState, setHistoryState] = useState<Update>({
        location: routeHistory.location,
        action: routeHistory.action,
    });

    useLayoutEffect(() => {
        routeHistory.listen(setHistoryState);
    }, []);

    return (
        <Router
            basename={basename}
            navigator={routeHistory}
            location={historyState.location}
            navigationType={historyState.action}
        >
            {children}
        </Router>
    );
}
