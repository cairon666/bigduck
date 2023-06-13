import classNames from 'classnames';
import { memo } from 'react';

export interface CellOfCalendarProps {
    type: 'select' | 'normal';
    disable?: boolean;
    today?: boolean;
    date: Date;
    onClick?: () => void;
}

export const CellOfCalendar = memo(function CellOfCalendar(props: CellOfCalendarProps) {
    return (
        <button
            type='button'
            onClick={props.onClick}
            className={classNames(
                'h-8 w-8 cursor-pointer rounded border border-transparent p-2 text-center text-sm',
                props.today ? 'bg-gray-20 text-gray-600' : '',
                props.type === 'normal' ? 'text-gray-1000 hover:!border-yellow-600' : '',
                props.type === 'select' ? '!bg-yellow-600 !text-gray-1000 hover:!bg-yellow-800' : '',
                props.disable ? 'bg-gray-40 text-gray-300' : '',
            )}
        >
            {props.date.getDate()}
        </button>
    );
});
