import { Dayjs } from 'dayjs';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input, DatePicker, DefaultDatePicker, Checkbox, Button, Error, Label, CheckboxGroup } from '@shared/uikit';
import { PasswordInput } from '@shared/uikit/Input/PasswordInput';
import { RegisterFormScheme } from '../../model';

export interface RegisterContentProps {
    register: UseFormRegister<RegisterFormScheme>;
    onSubmit: () => void;
    errors?: FieldErrors<RegisterFormScheme>;
    isLoading: boolean;
    onChangeDate: (date?: Dayjs) => void;
}

export function RegisterContent({ register, onSubmit, errors, isLoading, onChangeDate }: RegisterContentProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <Input
                error={errors?.email?.message}
                type="text"
                placeholder="Почта"
                required
                label="Почта"
                {...register('email')}
            />
            <PasswordInput
                error={errors?.password?.message}
                placeholder="Пароль"
                required
                label="Пароль"
                {...register('password')}
            />
            <Input
                error={errors?.first_name?.message}
                type="text"
                placeholder="Имя"
                required
                label="Имя"
                {...register('first_name')}
            />
            <Input
                error={errors?.second_name?.message}
                type="text"
                placeholder="Фамилия"
                required
                label="Фамилия"
                {...register('second_name')}
            />
            <Input
                error={errors?.user_name?.message}
                type="text"
                placeholder="Никнейм"
                required
                label="Никнейм"
                {...register('user_name')}
            />
            <DatePicker
                inputProps={{
                    placeholder: 'День рождения',
                    error: errors?.date_of_birth?.message,
                    label: 'День рождения',
                }}
                {...register('date_of_birth')}
                onChange={onChangeDate}
            >
                <DefaultDatePicker />
            </DatePicker>
            <CheckboxGroup label="Гендер" error={errors?.gender?.message}>
                <Checkbox value="male" type="radio" {...register('gender')} label="Мужчина" />
                <Checkbox value="female" type="radio" {...register('gender')} label="Женщина" />
            </CheckboxGroup>
            <Button disabled={isLoading} isLoading={isLoading}>
                Создать
            </Button>
        </form>
    );
}
