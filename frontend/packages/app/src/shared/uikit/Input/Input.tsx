import classNames from 'classnames';
import { ComponentProps, ForwardedRef, ReactNode, forwardRef } from 'react';
import { Error } from '../Error';
import { Label } from '../Label';
import style from './Input.module.scss';

export type InputOwnProps = {
    rightIcon?: ReactNode;
    onClickRightIcon?: () => void;
    error?: string;
    isError?: boolean;
    className?: string;
    label?: ReactNode;
    theme?: 'clear' | 'primary';
    required?: boolean;
};

export type InputProps = Omit<ComponentProps<'input'>, keyof InputOwnProps | 'ref'> & InputOwnProps;

export const Input = forwardRef(function Input(
    {
        error,
        isError,
        label,
        required,
        className,
        rightIcon,
        onClickRightIcon,
        theme = 'primary',
        ...otherProps
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
) {
    const inputClassName = classNames(className, style.input);

    const labelClassName = classNames(style.label, {
        [style.primary]: theme === 'primary',
        [style.clear]: theme === 'clear',
        [style.error]: error || isError,
    });

    return (
        <label className={labelClassName}>
            <Label required={required}>{label}</Label>
            <div className={style.wrapper}>
                <input {...otherProps} ref={ref} className={inputClassName} required={required} />
                {rightIcon && (
                    <button type="button" onClick={onClickRightIcon} className={style.button}>
                        {rightIcon}
                    </button>
                )}
            </div>
            <Error>{error}</Error>
        </label>
    );
});
