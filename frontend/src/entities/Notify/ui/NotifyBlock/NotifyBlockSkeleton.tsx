import { memo } from 'react';

export const NotifyBlockSkeleton = memo(function NotifyBlockSkeleton() {
    return (
        <div
            className={
                'w-full cursor-pointer border border-b-transparent border-l-transparent border-r-transparent border-t-gray-100 px-4 py-2'
            }
        >
            <div className={'h-4 w-full animate-pulse rounded bg-gray-80 font-normal'} />
            <div className={'mt-1 h-8 w-full animate-pulse rounded bg-gray-80'} />
            <div className={'flex items-center justify-between'}>
                <div />
                <p className={'mt-1 h-2 w-20 animate-pulse rounded bg-gray-80'} />
            </div>
        </div>
    );
});
