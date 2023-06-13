import classNames from 'classnames';
import { ComponentProps, forwardRef, useCallback, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { Error } from '../_Error';
import { Label } from '../_Label';

type InputOwnProps = {
    fullWidth?: boolean;
    label?: string;
    errorLabel?: string;
    error?: boolean;
    labelClassName?: string;
};

export type InputProps = Omit<ComponentProps<'input'>, keyof InputOwnProps> & InputOwnProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
    const { errorLabel, label, error, fullWidth, required, className, type, labelClassName, ...otherProps } = props;

    // for password type.
    const [typePassword, setTypePassword] = useState<'password' | 'text' | undefined>(
        props.type === 'password' ? 'password' : undefined,
    );

    const toggleType = useCallback(() => {
        setTypePassword((type) => (type === 'password' ? 'text' : 'password'));
    }, []);

    const inputClassName = classNames(
        `peer rounded border border-gray-200 bg-white px-2 py-1 font-normal text-gray-900 placeholder-gray-300 
        hover:border-gray-600 focus-visible:border-gray-500 focus-visible:outline-none disabled:border-gray-100 
        disabled:bg-gray-60`,
        fullWidth ? 'w-full' : '',
        errorLabel || error ? 'border-red-800 text-red-800' : '',
        className,
    );

    return (
        <label className={classNames(labelClassName, 'flex flex-col gap-1')}>
            <Label label={label} required={required} />
            <div className={'relative'}>
                <input {...otherProps} ref={ref} type={typePassword || type} className={inputClassName} />
                {typePassword && (
                    <button className={'absolute top-2/4 right-2 -translate-y-2/4'} onClick={toggleType} type='button'>
                        {typePassword === 'password' ? (
                            <AiFillEye className={'h-5 w-5'} />
                        ) : (
                            <AiFillEyeInvisible className={'h-5 w-5'} />
                        )}
                    </button>
                )}
            </div>
            <Error error={errorLabel} />
        </label>
    );
});
