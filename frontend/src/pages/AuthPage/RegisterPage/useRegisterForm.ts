import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

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
    } = useForm<RegisterForm>({
        resolver: yupResolver(registerScheme),
    });

    const onSubmit = handleSubmit(
        (form) => {
            console.log(form);
        },
        (form) => {
            console.log(form);
        },
    );

    const onChangeDate = (date: Date | null) => {
        setValue('date_of_birth', date);
    };

    return {
        register,
        onSubmit,
        errors,
        onChangeDate,
    };
}
