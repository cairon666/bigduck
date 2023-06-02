import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import { authSlice, fetchRegister, useAppDispatch, useAppSelector } from '../../../_redux';

const registerScheme = object({
    login: string().required('Логин обязательное поле'),
    password: string().required('Пароль обязательное поле'),
    email: string().email('Плохой формат почты').required('Почта обязательное поле'),
    first_name: string().required('Имя обязательное поле'),
    second_name: string().required('Фамилия обязательное поле'),
    username: string().required('Никнейм обязательное поле'),
    date_of_birth: string().nullable(),
    gender: string().nullable().oneOf(['male', 'female', null]),
});

interface RegisterForm {
    login: string;
    password: string;
    email: string;
    first_name: string;
    second_name: string;
    username: string;
    date_of_birth: Date | null;
    gender: 'male' | 'female';
}

export function useRegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<RegisterForm>({
        resolver: yupResolver(registerScheme),
    });
    const authStorage = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((form) => {
        if (authStorage.isLoading) {
            return;
        }

        dispatch(fetchRegister());
    });

    const onChangeDate = useCallback((date: Date | null) => {
        setValue('date_of_birth', date);
    }, []);

    useEffect(() => {
        if (authStorage.isSuccess) {
            dispatch(authSlice.actions.CLEAR());
            const values = getValues();
            navigate(`/auth/login?login=${values.login}&password=${values.password}`);
        }
    }, [authStorage.isSuccess]);

    return {
        register,
        onSubmit,
        errors,
        onChangeDate,
        isLoading: authStorage.isLoading,
    };
}
