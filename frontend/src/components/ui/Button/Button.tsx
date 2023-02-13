import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
    const { ...otherProps } = props;

    return (
        <button
            {...otherProps}
            ref={ref}
            className={classNames(
                `rounded border-2 border-transparent bg-blue-600 p-2 text-white 
      hover:bg-blue-500 focus-visible:border-black focus-visible:outline-none 
      disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500
      disabled:shadow-none`,
                otherProps.className,
            )}
        />
    );
});
