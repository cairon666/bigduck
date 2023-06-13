import React, { ReactNode } from 'react';

export type PageHeaderProps = {
    icon?: ReactNode;
    label: string;
    right?: ReactNode;
};

export function PageHeader({ icon, label, right }: PageHeaderProps) {
    return (
        <div className={'flex items-center justify-between rounded-t bg-gray-20 py-2 px-4'}>
            <div className={'flex items-center gap-4'}>
                {icon && (
                    <div
                        className={
                            'flex h-7 w-7 items-center items-center justify-center rounded bg-yellow-600 text-white'
                        }
                    >
                        {icon}
                    </div>
                )}
                <div className={'font-medium'}>{label}</div>
            </div>
            {right}
        </div>
    );
}
