import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAuthManager, setAccessToken } from '../../../di/api-client';
import { BadRequest, LoginRequest } from '../../../api';
import { CodeError, DatabaseCodes } from '../../../redux/types';

type FormData = {
    login: string;
    password: string;
};

const loginScheme = object({
    login: string()
        .required('Логин обязательный параметр')
        .matches(
            /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/,
            'Логин не должен содержать пробелов',
        ),
    password: string()
        .required('Пароль обязательный параметр')
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Пароль должен содержать как минимум 1 букву нижнего регистра, 1 букву верхнего регистра, 1 специальный знак и длина должна быть больше 8',
        ),
});

const loginQuery = async (data: LoginRequest) => {
    const manager = await createAuthManager();
    return await manager.login(data);
};

interface QueryErrors {
    notFound?: string;
    badPassword?: string;
}

export const useLoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(loginScheme),
        defaultValues: {
            login: new URL(document.URL).searchParams.get('login') || '',
            password: new URL(document.URL).searchParams.get('password') || '',
        },
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [queryErrors, setQueryErrors] = useState<QueryErrors>({});

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsLoading(true);
            const res = await loginQuery({
                login: data.login,
                password: data.password,
            });
            setAccessToken(res.access_token);
            navigate('/panel');
        } catch (e) {
            if (e instanceof BadRequest) {
                switch (e.code) {
                    // database
                    case CodeError.Database: {
                        switch (e.details[0]) {
                            case DatabaseCodes.NotFound: {
                                setQueryErrors({
                                    notFound: 'Логин не найден',
                                });
                                break;
                            }
                            case DatabaseCodes.AuthBadPassword: {
                                setQueryErrors({
                                    badPassword: 'Неверный пароль',
                                });
                                break;
                            }
                        }
                    }
                }
            }
        }
        setIsLoading(false);
    });
    return {
        register,
        onSubmit,
        errors,
        isLoading,
        queryErrors,
    };
};
