import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const { ...otherProps } = props;

        return (
            <button
                {...otherProps}
                ref={ref}
                className={classNames(
                    `border-2 border-transparent bg-blue-600 rounded text-white p-2 
      hover:bg-blue-500 focus-visible:outline-none disabled:bg-slate-50 
      disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      focus-visible:border-black`,
                    otherProps.className,
                )}
            />
        );
    },
);
