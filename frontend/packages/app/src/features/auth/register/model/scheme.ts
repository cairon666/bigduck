import { object, string } from 'yup';

export interface RegisterFormScheme {
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    user_name: string;
    date_of_birth?: Date | null;
    gender?: 'male' | 'female' | null;
    avatar_url?: string | null;
}

export const registerFormScheme = object({
    email: string().required('Почта обязательное поле'),
    password: string().required('Пароль обязательное поле'),
    first_name: string().required('Имя обязательное поле'),
    second_name: string().required('Фамилия обязательное поле'),
    user_name: string().required('Никнейм обязательное поле'),
    date_of_birth: string().nullable(),
    gender: string().nullable().oneOf(['male', 'female', null]),
    avatar_url: string().nullable(),
});
