import { yupResolver } from '@hookform/resolvers/yup';
import { Dayjs } from 'dayjs';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ValidateErr } from '@shared/api';
import { usePostRegister } from '../api';
import { RegisterFormScheme, registerFormScheme } from '../model';
import { RegisterContent } from './RegisterContent';
import { RegisterFooter } from './RegisterFooter';
import { RegisterHeader } from './RegisterHeader';

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
    } = useForm<RegisterFormScheme>({
        resolver: yupResolver(registerFormScheme),
    });

    const { isLoading, mutate: postRegister } = usePostRegister({
        onError: (e) => {
            if (e instanceof ValidateErr) {
                // если пришла ошибка валидации
                e.json.then((res) => {
                    for (const [name, error] of Object.entries(res.validate)) {
                        setError(name as keyof RegisterFormScheme, { message: error.message });
                    }
                });
            }
        },
    });

    const onSubmit = handleSubmit((data) => {
        postRegister(data);
    });

    const onChangeDate = useCallback((date: Dayjs | undefined) => {
        setValue('date_of_birth', date?.toDate());
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <RegisterHeader />
            <RegisterContent
                errors={errors}
                register={register}
                onSubmit={onSubmit}
                isLoading={isLoading}
                onChangeDate={onChangeDate}
            />
            <RegisterFooter />
        </div>
    );
}
