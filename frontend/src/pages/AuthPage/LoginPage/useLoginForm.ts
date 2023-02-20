import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

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

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return { register, onSubmit, errors };
}
