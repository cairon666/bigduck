import classNames from 'classnames';
import { HTMLAttributes, forwardRef } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
    return (
        <div {...props} ref={ref} className={classNames(props.className, 'rounded border border-gray-100 bg-white')} />
    );
});
