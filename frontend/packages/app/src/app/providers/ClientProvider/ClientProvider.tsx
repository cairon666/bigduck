import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

interface QueryClientProviderProps {
    children?: ReactNode;
}

export function ClientProvider({ children }: QueryClientProviderProps) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
