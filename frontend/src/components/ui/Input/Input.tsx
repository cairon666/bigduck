import classNames from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';

import { Error } from '../_Error';
import { Label } from '../_Label';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    fullWidth?: boolean;
    label?: string;
    error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
    const { error, label, fullWidth, required, className, ...otherProps } = props;

    return (
        <label>
            <Label label={label} required={required} />
            <input
                {...otherProps}
                ref={ref}
                className={classNames(
                    'peer rounded border border-gray-200 bg-white px-2 py-1 font-normal text-gray-900 placeholder-gray-300 hover:border-gray-600 focus-visible:border-gray-500 focus-visible:outline-none disabled:border-gray-100 disabled:bg-gray-60',
                    fullWidth ? 'w-full' : '',
                    error ? 'border-red-800 text-red-800' : '',
                    className,
                )}
            />
            <Error error={error} />
        </label>
    );
});
