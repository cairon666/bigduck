import classNames from 'classnames';
import { HTMLProps, forwardRef } from 'react';

import { Wrapper } from '../Wrapper';

type InputProps = HTMLProps<HTMLInputElement> & {
    fullWidth?: boolean;
    label?: string;
    error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
    const { fullWidth, label, error, required, ...otherProps } = props;

    return (
        <Wrapper error={error} label={label} required={required}>
            <input
                {...otherProps}
                ref={ref}
                className={classNames(
                    props.className,
                    'relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm',
                    'cursor-text placeholder:text-slate-400 focus-visible:text-blue-900',
                    fullWidth ? 'w-full' : '',
                    error ? 'ring-1 !ring-red-600 ' : '',
                )}
            />
        </Wrapper>
    );
});
