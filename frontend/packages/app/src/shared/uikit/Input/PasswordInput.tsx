import { ForwardedRef, forwardRef, useCallback, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Input, InputProps } from './Input';

export const PasswordInput = forwardRef(function PasswordInput(
    props: InputProps,
    ref: ForwardedRef<HTMLInputElement | null>,
) {
    const [type, setType] = useState<'password' | 'text'>('password');

    const onClick = useCallback(() => {
        setType((prev) => (prev === 'password' ? 'text' : 'password'));
    }, []);

    return (
        <Input
            {...props}
            ref={ref}
            type={type}
            onClickRightIcon={onClick}
            rightIcon={
                type === 'password' ? <AiFillEyeInvisible className="h-4 w-4" /> : <AiFillEye className="h-4 w-4" />
            }
        />
    );
});
