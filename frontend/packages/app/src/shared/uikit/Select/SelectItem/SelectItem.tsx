import classNames from 'classnames';
import React, { ReactNode, memo } from 'react';

interface SelectItemProps {
    label: string;
    onClick?: () => void;
    isActive?: boolean;
    icon?: ReactNode;
}

export const SelectItem = memo(function SelectItem({ isActive, label, icon, onClick }: SelectItemProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={classNames('flex w-full items-center justify-between px-2 py-1 hover:bg-gray-40', {
                'bg-gray-40': isActive,
            })}
        >
            <span>{label}</span>
            {icon}
        </button>
    );
});
