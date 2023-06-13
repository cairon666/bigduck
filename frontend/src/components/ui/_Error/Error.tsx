import { memo } from 'react';

export interface ErrorProps {
    error?: string;
}

export const Error = memo(function Error({ error }: ErrorProps) {
    return error ? <span className={'text-xs font-normal leading-3 text-red-800'}>{error}</span> : null;
});
