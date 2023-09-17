import { StrictMode } from 'react';
import ErrorBoundary from '@shared/uikit/ErrorBoundary';
import { ClientProvider } from './providers/ClientProvider';
import { RouterProvider } from './providers/RouterProvider';
import { AppRouting } from './routing';
import './styles/index.scss';

export function App() {
    return (
        <StrictMode>
            <ErrorBoundary>
                <ClientProvider>
                    <RouterProvider>
                        <AppRouting />
                    </RouterProvider>
                </ClientProvider>
            </ErrorBoundary>
        </StrictMode>
    );
}
