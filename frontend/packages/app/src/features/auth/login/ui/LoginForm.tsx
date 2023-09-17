import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { AppErrorCodes } from '@shared/api';
import { AppErr, ValidateErr } from '@shared/api/HTTPErrs';
import { usePostLogin } from '../api';
import { LoginFormScheme, loginFormScheme } from '../model';
import { LoginContent } from './LoginContent';
import { LoginError } from './LoginError';
import { LoginFooter } from './LoginFooter';
import { LoginHeader } from './LoginHeader';

export const LoginForm = observer(function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
    } = useForm<LoginFormScheme>({
        resolver: yupResolver(loginFormScheme),
    });
    const [logicError, setLogicError] = useState<AppErrorCodes | null>(null);

    const { isLoading, mutate: postLogin } = usePostLogin({
        onError: (error) => {
            if (error instanceof ValidateErr) {
                // если пришла ошибка валидации
                error.json.then((res) => {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const [name, error] of Object.entries(res.validate)) {
                        setError(name as keyof LoginFormScheme, { message: error.message });
                    }
                });
            } else if (error instanceof AppErr) {
                error.json.then((res) => {
                    setLogicError(res.error.code);
                });
            }
        },
    });

    const onSubmit = handleSubmit((form: LoginFormScheme) => {
        setLogicError(null);
        postLogin(form);
    });

    /**
     * вставляет пароль и логин из параметров url в поля
     */
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
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <LoginHeader />
            <LoginError error={logicError} />
            <LoginContent onSubmit={onSubmit} register={register} isLoading={isLoading} errors={errors} />
            <LoginFooter />
        </div>
    );
});
