import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { object, string } from 'yup';

import { ApiErrorCodes } from '../../../services/Api';
import _localstorage from '../../../services/AsyncStorage';
import _i18n from '../../../services/i18n';
import { LoginAction, useAppDispatch } from '../../../services/Redux';
import { LoginErrorStatus } from './ErrorWindowContent';

interface LoginForm {
    email: string;
    password: string;
}

const loginScheme = object({
    email: string().required(_i18n.auth.EmailRequired),
    password: string().required(_i18n.auth.PasswordRequired),
});

export function useLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm<LoginForm>({
        resolver: yupResolver(loginScheme),
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [errorWindow, setErrorWindow] = useState<LoginErrorStatus | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    // fill from search params
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const email = searchParams.get('email');
        if (email) {
            setValue('email', email);
        }

        const password = searchParams.get('password');
        if (password) {
            setValue('password', password);
        }
    }, [setValue, searchParams]);

    const onSubmit = useCallback((data: LoginForm) => {
        setErrorWindow(undefined);
        setIsLoading(true);

        dispatch(
            LoginAction({
                data: data,
                onEnd: () => {
                    setIsLoading(false);
                },
                onSuccess: (data) => {
                    _localstorage.setAccessToken(data.access_token);
                    _localstorage.setUserId(data.id_user);
                    navigate('/panel');
                },
                onError: (apiErr) => {
                    for (const err of apiErr.errors) {
                        switch (err.code) {
                            case ApiErrorCodes.CodeNotFound:
                                setErrorWindow(LoginErrorStatus.EmailNotFound);
                                break;
                            case ApiErrorCodes.CodeBadPassword:
                                setErrorWindow(LoginErrorStatus.WrongPassword);
                                break;
                            case ApiErrorCodes.CodeBadEmail:
                                setError('email', {
                                    message: _i18n.auth.EmailBadFormat,
                                });
                                break;
                            case ApiErrorCodes.CodeShortPassword:
                                setError('password', {
                                    message: _i18n.auth.ShortPasswordMessage,
                                });
                                break;
                        }
                    }
                },
            }),
        );
    }, []);

    return {
        register,
        onSubmit: handleSubmit(onSubmit),
        errorWindow,
        isLoading,
        errors,
    };
}
