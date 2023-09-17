import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input, Button } from '@shared/uikit';
import { LoginFormScheme } from '../../model';

export interface LoginContentProps {
    onSubmit: () => void;
    errors?: FieldErrors<LoginFormScheme>;
    isLoading: boolean;
    register: UseFormRegister<LoginFormScheme>;
}

export function LoginContent({ onSubmit, errors, isLoading, register }: LoginContentProps) {
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
            <Input
                type="password"
                error={errors?.password?.message}
                placeholder="Пароль"
                required
                label="Пароль"
                {...register('password')}
            />
            <Button disabled={isLoading} isLoading={isLoading} type="submit">
                Войти
            </Button>
        </form>
    );
}
