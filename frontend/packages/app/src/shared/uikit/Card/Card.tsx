import classNames from 'classnames';
import { HTMLAttributes, forwardRef } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
    const className = classNames(props.className, 'block shadow rounded border border-gray-150 bg-white');

    return <div {...props} ref={ref} className={className} />;
});
