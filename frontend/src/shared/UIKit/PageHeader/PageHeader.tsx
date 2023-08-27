import React, { ReactNode } from 'react';

export type PageHeaderProps = {
    left?: ReactNode;
    label: string;
    right?: ReactNode;
};

export function PageHeader({ left, label, right }: PageHeaderProps) {
    return (
        <header className={'flex items-center justify-between rounded-t bg-gray-20 px-4 py-2'}>
            <div className={'flex items-center gap-4'}>
                {left && (
                    <div className={'flex h-7 w-7 items-center justify-center rounded bg-yellow-600 text-white'}>
                        {left}
                    </div>
                )}
                <p className={'font-medium'}>{label}</p>
            </div>
            {right}
        </header>
    );
}
