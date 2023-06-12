import { useEffect } from 'react';
import { IoWarningOutline } from 'react-icons/all';
import { Link } from 'react-router-dom';

import { Button, Input } from '../../../components/ui';
import _i18n from '../../../services/i18n';
import { ErrorWindowContent } from './ErrorWindowContent';
import { useLogin } from './useLogin';

export function Login() {
    const { register, onSubmit, errorWindow, isLoading, errors } = useLogin();

    // set title
    useEffect(() => {
        document.title = _i18n.auth.Authorization;
    }, []);

    return (
        <div>
            <h1 className={'text-center text-xl font-medium'}>{_i18n.auth.Authorization}</h1>
            {errorWindow ? (
                <div
                    className={
                        'my-2 flex flex-col items-center justify-center rounded-md bg-red-200 p-2 text-center text-xs text-gray-800'
                    }
                >
                    <IoWarningOutline className={'h-6 w-6'} />
                    <ErrorWindowContent error={errorWindow} />
                </div>
            ) : null}
            <form onSubmit={onSubmit} className={'flex flex-col gap-2'}>
                <Input
                    fullWidth
                    errorLabel={errors?.email?.message}
                    type={'text'}
                    placeholder={_i18n.auth.Mail}
                    required
                    label={_i18n.auth.Mail}
                    {...register('email')}
                />
                <Input
                    type={'password'}
                    fullWidth
                    errorLabel={errors?.password?.message}
                    placeholder={_i18n.auth.Password}
                    required
                    label={_i18n.auth.Password}
                    {...register('password')}
                />
                <Button isLoading={isLoading} type={'submit'}>
                    {_i18n.auth.SigIn}
                </Button>
            </form>
            <p className={'mt-1 text-center text-sm font-light'}>
                <span>{_i18n.auth.DontHaveAccount} </span>
                <Link className={'text-yellow-500 hover:underline'} to='/auth/register'>
                    {_i18n.auth.Register}
                </Link>
            </p>
        </div>
    );
}
