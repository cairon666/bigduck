import {
    UpdatePasswordFormScheme,
    postRecoverPasswordUpdate,
    updatePasswordFormScheme,
    useRecoverPasswordViewer,
} from '@/features/auth-forms';
import { useAppDispatch } from '@/shared/hooks';
import { Button, Input } from '@/shared/UIKit';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export function RecoverPasswordUpdateForm() {
    const { register, handleSubmit, formState, setError, reset } = useForm<UpdatePasswordFormScheme>({
        resolver: yupResolver(updatePasswordFormScheme),
    });
    const {
        email,
        update: { isLoading, validateError },
    } = useRecoverPasswordViewer();
    const dispatch = useAppDispatch();

    const onSubmit = useCallback(
        (data: UpdatePasswordFormScheme) => {
            dispatch(
                postRecoverPasswordUpdate({
                    ...data,
                    email: email || '',
                }),
            );
        },
        [email],
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-2'}>
            <Input
                required
                label={'Пароль'}
                placeholder={'Пароль'}
                type={'password'}
                error={formState.errors.password?.message || validateError?.password}
                {...register('password')}
            />
            <Input
                required
                label={'Повторите пароль'}
                placeholder={'Повторите пароль'}
                type={'password'}
                error={formState.errors.repeatPassword?.message}
                {...register('repeatPassword')}
            />
            <Button disabled={isLoading} isLoading={isLoading}>
                Отправить
            </Button>
        </form>
    );
}
