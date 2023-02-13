import classNames from 'classnames';
import { HTMLProps } from 'react';

export const Card = (props: HTMLProps<HTMLDivElement>) => {
    return (
        <div
            {...props}
            className={classNames(
                props.className,
                'cursor-default rounded-lg border border-blue-400 bg-gray-100 p-1 text-left shadow-md',
            )}
        />
    );
};
