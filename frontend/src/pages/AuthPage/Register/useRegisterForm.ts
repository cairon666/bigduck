import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import { ApiErrorCodes } from '../../../_api';
import _i18n from '../../../_i18n';
import { RegisterAction, useAppDispatch } from '../../../_redux';

const registerScheme = object({
    email: string().email(_i18n.auth.EmailBadFormat).required(_i18n.auth.EmailRequired),
    password: string().required(_i18n.auth.PasswordRequired),
    first_name: string().required(_i18n.auth.FirstNameRequired),
    second_name: string().required(_i18n.auth.SecondNameRequired),
    date_of_birth: string().nullable(),
    gender: string().nullable().oneOf(['male', 'female', null]),
});

interface RegisterForm {
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    date_of_birth?: Date | null;
    gender?: 'male' | 'female';
}

export function useRegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        setError,
    } = useForm<RegisterForm>({
        resolver: yupResolver(registerScheme),
    });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = useCallback((data: RegisterForm) => {
        setIsLoading(true);

        dispatch(
            RegisterAction({
                data: {
                    ...data,
                    date_of_birth: data.date_of_birth
                        ? dayjs(data.date_of_birth).format('YYYY-MM-DDTHH:mm:ssZ')
                        : undefined,
                },
                onError: (apiErr) => {
                    for (const err of apiErr.errors) {
                        switch (err.code) {
                            case ApiErrorCodes.CodeEmailAlreadyExist:
                                setError('email', { message: _i18n.auth.EmailAlreadyExist });
                                break;
                            case ApiErrorCodes.CodeBadEmail:
                                setError('email', { message: _i18n.auth.EmailBadFormat });
                                break;
                            case ApiErrorCodes.CodeShortPassword:
                                setError('password', { message: _i18n.auth.ShortPasswordMessage });
                                break;
                            case ApiErrorCodes.CodeShortFirstName:
                                setError('first_name', { message: _i18n.auth.FirstNameShort });
                                break;
                            case ApiErrorCodes.CodeShortSecondName:
                                setError('second_name', { message: _i18n.auth.SecondNameShort });
                                break;
                            case ApiErrorCodes.CodeGenderNotFound:
                                setError('gender', { message: _i18n.auth.SecondNameShort });
                                break;
                            case ApiErrorCodes.CodeDateOfBirthFromFeature:
                                setError('date_of_birth', { message: _i18n.auth.DateFromFeature });
                                break;
                        }
                    }
                },
                onSuccess: () => {
                    const values = getValues();
                    navigate(`/auth/login?email=${values.email}&password=${values.password}`);
                },
                onEnd: () => {
                    setIsLoading(false);
                },
            }),
        );
    }, []);

    const onChangeDate = useCallback((date: Date | null) => {
        setValue('date_of_birth', date);
    }, []);

    return {
        register,
        onSubmit: handleSubmit(onSubmit),
        errors,
        onChangeDate,
        isLoading,
    };
}
