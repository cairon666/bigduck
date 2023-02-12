import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectItemProps } from '../../../components/ui';
import { createAuthManager } from '../../../di/api-client';
import { BadRequest, RegisterRequest } from '../../../api';
import { CodeError, DatabaseCodes } from '../../../redux/types';

type FormData = {
    login: string;
    password: string;
    username: string;
    first_name: string;
    second_name: string;
    email: string;
    avatar_url: string | null;
    day_of_birth: Date | null;
    gender: SelectItemProps | null;
};

const registerScheme = object({
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
    username: string()
        .required('Никнейм обязательный параметр')
        .min(4, 'Никнейм должен содержать от 4 символов'),
    first_name: string()
        .required('Имя обязательный параметр')
        .min(4, 'Имя должно содержать от 4 символов'),
    second_name: string()
        .required('Фамилия обязательный параметр')
        .min(4, 'Фамилия должна содержать от 4 символов'),
    email: string()
        .required('Почта обязательный параметр')
        .email('Неверный формат почты'),
});

const itemsSelect: SelectItemProps[] = [
    {
        name: 'Мужчина',
        value: 'male',
    },
    {
        name: 'Женщина',
        value: 'female',
    },
];

const registerQuery = async (data: RegisterRequest) => {
    const manager = await createAuthManager();
    return await manager.register(data);
};

export const useRegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        watch,
    } = useForm<FormData>({
        resolver: yupResolver(registerScheme),
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [alreadyExist, setAlreadyExist] = useState<
        Partial<Record<'username' | 'email' | 'login', boolean>>
    >({});

    const changeDate = useCallback(
        (date: Date | null) => {
            setValue('day_of_birth', date);
        },
        [setValue],
    );

    const changeSelectGender = useCallback(
        (item: SelectItemProps) => {
            setValue('gender', item);
        },
        [setValue],
    );

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsLoading(true);
            await registerQuery({
                ...data,
                gender: data.gender?.value || null,
                day_of_birth: data.day_of_birth || null,
                avatar_url: data.avatar_url || null,
            });
            navigate(
                `/auth/login?login=${data.login}&password=${data.password}`,
            );
        } catch (e) {
            if (e instanceof BadRequest) {
                switch (e.code) {
                    case CodeError.Database: {
                        switch (e.details[0]) {
                            case DatabaseCodes.EmailAlreadyExist: {
                                setAlreadyExist({
                                    email: true,
                                });
                                break;
                            }
                            case DatabaseCodes.LoginAlreadyExist: {
                                setAlreadyExist({
                                    login: true,
                                });
                                break;
                            }
                            case DatabaseCodes.UsernameAlreadyExist: {
                                setAlreadyExist({
                                    username: true,
                                });
                                break;
                            }
                        }
                        break;
                    }
                    // something
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
        alreadyExist,
        changeDate,
        itemsSelect,
        changeSelectGender,
        watch,
    };
};
