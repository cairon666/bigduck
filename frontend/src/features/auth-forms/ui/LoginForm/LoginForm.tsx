import { LoginFormScheme, loginFormScheme, postPostLogin, useLoginViewer } from '@/features/auth-forms';
import { useAppDispatch } from '@/shared/hooks';
import { Button, Input } from '@/shared/UIKit';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<LoginFormScheme>({
        // resolver: yupResolver(loginFormScheme),
    });
    const dispatch = useAppDispatch();
    const { isLoading, validateError, error } = useLoginViewer();

    // set data from url params
    const [searchParams, _] = useSearchParams();
    useEffect(() => {
        const email = searchParams.get('email');
        if (email) {
            setValue('email', email);
        }

        const password = searchParams.get('password');
        if (password) {
            setValue('password', password);
        }
    }, [searchParams]);

    const onSubmit = useCallback(
        (data: LoginFormScheme) => {
            dispatch(postPostLogin(data));
        },
        [dispatch],
    );

    return (
        <div>
            <h1 className={'text-center text-xl font-medium'}>Авторизация</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-2'}>
                {error}
                <Input
                    error={errors?.email?.message || validateError?.email}
                    type={'text'}
                    placeholder={'Почта'}
                    required
                    label={'Почта'}
                    {...register('email')}
                />
                <Input
                    type={'password'}
                    error={errors?.password?.message || validateError?.password}
                    placeholder={'Пароль'}
                    required
                    label={'Пароль'}
                    {...register('password')}
                />
                <Button disabled={isLoading} isLoading={isLoading} type={'submit'}>
                    Войти
                </Button>
            </form>
            <p className={'mt-1 text-center text-sm font-light'}>
                <span>Нету аккаунта? </span>
                <Link className={'text-yellow-500 hover:underline'} to="/auth/register">
                    Зарегистрироваться
                </Link>
            </p>
        </div>
    );
}
