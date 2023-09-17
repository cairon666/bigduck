import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AppErr, ValidateErr } from '@shared/api';
import { Input, Button } from '@shared/uikit';
import { useRecoverUpdate } from '../../api';
import { UpdatePasswordFormScheme, currentState, updatePasswordFormScheme } from '../../model';

export function UpdateForm() {
    const { register, handleSubmit, formState, setError } = useForm<UpdatePasswordFormScheme>({
        resolver: yupResolver(updatePasswordFormScheme),
    });

    const { isLoading, mutate: postRecoverUpdate } = useRecoverUpdate({
        onError: (e: unknown) => {
            if (e instanceof ValidateErr) {
                console.log(e);
            } else if (e instanceof AppErr) {
                console.log(e);
            } else {
                throw new Error(`UpdateForm: useRecoverUpdate: unknowjn error type: ${e}`);
            }
        },
    });

    const onSubmit = handleSubmit((data) => {
        if (!currentState.email) {
            throw new Error('UpdateForm: onSubmit: email is empty');
        }

        postRecoverUpdate(data.password);
    });

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <Input
                required
                label="Пароль"
                placeholder="Пароль"
                type="password"
                error={formState.errors.password?.message}
                {...register('password')}
            />
            <Input
                required
                label="Повторите пароль"
                placeholder="Повторите пароль"
                type="password"
                error={formState.errors.repeatPassword?.message}
                {...register('repeatPassword')}
            />
            <Button disabled={isLoading} isLoading={isLoading}>
                Отправить
            </Button>
        </form>
    );
}
