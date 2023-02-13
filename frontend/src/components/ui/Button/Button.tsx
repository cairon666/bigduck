import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    theme?: 'primary' | 'danger';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { theme = 'primary', disabled, ...otherProps },
    ref,
) {
    return (
        <button
            {...otherProps}
            ref={ref}
            disabled={disabled}
            className={classNames(
                theme === 'primary' ? 'bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500' : '',
                theme === 'danger' ? 'bg-red-100 text-red-900 hover:bg-red-200 focus-visible:ring-red-500' : '',
                disabled
                    ? 'disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                    : '',
                `rounded border-2 border-transparent px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`,
                otherProps.className,
            )}
        />
    );
});
