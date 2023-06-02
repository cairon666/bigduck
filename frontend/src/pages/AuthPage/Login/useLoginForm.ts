import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import { authSlice, fetchLogin, useAppDispatch, useAppSelector } from '../../../_redux';

const loginScheme = object({
    login: string().required('Логин обязательное поле'),
    password: string().required('Пароль обязательное поле'),
});

interface LoginForm {
    login: string;
    password: string;
}

export function useLoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: yupResolver(loginScheme),
    });
    const authStorage = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = handleSubmit(() => {
        if (authStorage.isLoading) {
            return;
        }

        dispatch(fetchLogin());
    });

    useEffect(() => {
        if (authStorage.isSuccess) {
            dispatch(authSlice.actions.CLEAR());
            navigate('/panel');
        }
    }, [authStorage.isSuccess]);

    return { register, onSubmit, errors, isLoading: authStorage.isLoading };
}
