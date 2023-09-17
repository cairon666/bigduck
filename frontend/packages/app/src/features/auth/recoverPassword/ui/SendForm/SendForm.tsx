import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { AppErr, AppErrorCodes, ValidateErr } from '@shared/api';
import { Info, Input, Button } from '@shared/uikit';
import { useRecoverSend } from '../../api';
import { SendEmailFormScheme, sendEmailFormScheme } from '../../model';

export function SendForm() {
    const { register, handleSubmit, formState, setValue, setError } = useForm<SendEmailFormScheme>({
        resolver: yupResolver(sendEmailFormScheme),
    });

    const [logicError, setLogicError] = useState<null | AppErrorCodes.CodeNotFound>(null);

    const { isLoading, mutate: postRecoverSend } = useRecoverSend({
        onError(error: unknown) {
            if (error instanceof ValidateErr) {
                // если пришла ошибка валидации
                error.json.then((res) => {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const [name, error] of Object.entries(res.validate)) {
                        setError(name as keyof SendEmailFormScheme, { message: error.message });
                    }
                });
            } else if (error instanceof AppErr) {
                error.json.then((res) => {
                    if (res.error.code === AppErrorCodes.CodeNotFound) {
                        setLogicError(AppErrorCodes.CodeNotFound);
                    }
                });
            }
        },
    });

    const onSubmit = handleSubmit((data) => {
        setLogicError(null);
        postRecoverSend(data.email);
    });

    // init email
    const [searchParams] = useSearchParams();
    useEffect(() => {
        setValue('email', searchParams.get('email') || '');
    }, []);

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <Info className="text-center" type="warn" as="p">
                Для востановления пароля нужно ввести почту, привязаную к аккаунту. Мы отправим четерех значный код,
                получение которого нужно будет подтвердить.
            </Info>
            <Input
                id="email"
                error={formState.errors.email?.message}
                required
                className=""
                label="Почта"
                placeholder="Почта"
                {...register('email')}
            />
            <Button disabled={isLoading} isLoading={isLoading} className="w-full">
                Отправить
            </Button>
        </form>
    );
}
