import { object, string } from 'yup';

export interface LoginFormScheme {
    email: string;
    password: string;
}

export const loginFormScheme = object({
    email: string().required('Почта обязательное поле'),
    password: string().required('Пароль обязательное поле'),
});
