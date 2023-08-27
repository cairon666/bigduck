import { object, ref, string } from 'yup';

export interface SendEmailFormScheme {
    email: string;
}

export const sendEmailFormScheme = object<SendEmailFormScheme>({
    email: string().required('Почта обязательное поле').email('Неправильный формат почты'),
});

export interface UpdatePasswordFormScheme {
    password: string;
    repeatPassword: string;
}

export const updatePasswordFormScheme = object<UpdatePasswordFormScheme>({
    password: string().required('Пароль обязательное поле'),
    repeatPassword: string()
        .required('Пароль обязательное поле')
        .oneOf([ref('password')], 'Пароли должны совпадать'),
});

const CodeRegExp = new RegExp('^[0-9]{4}$');

export interface ConfirmCodeFormScheme {
    code: string;
}

export const confirmCodeFormScheme = object<ConfirmCodeFormScheme>({
    code: string().required(),
});
