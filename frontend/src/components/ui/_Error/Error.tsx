import { memo } from 'react';

export interface ErrorProps {
    error?: string;
}

export const Error = memo(function Error({ error }: ErrorProps) {
    return error ? <div className={'text-xs font-normal text-red-800'}>{error}</div> : null;
});
