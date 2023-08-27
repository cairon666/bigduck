import {
    SendEmailFormScheme,
    postRecoverPasswordSend,
    sendEmailFormScheme,
    useRecoverPasswordViewer,
} from '@/features/auth-forms';
import { useAppDispatch } from '@/shared/hooks';
import { Button, Info, Input } from '@/shared/UIKit';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

export function RecoverPasswordSendForm() {
    const { register, handleSubmit, formState, setValue } = useForm<SendEmailFormScheme>({
        resolver: yupResolver(sendEmailFormScheme),
    });
    const dispatch = useAppDispatch();
    const {
        send: { isLoading, validateError },
        email,
    } = useRecoverPasswordViewer();

    // init email
    const [searchParams] = useSearchParams();
    useEffect(() => {
        setValue('email', email || searchParams.get('email') || '');
    }, [email]);

    const onSubmit = useCallback((data: SendEmailFormScheme) => {
        dispatch(postRecoverPasswordSend(data));
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center gap-2'}>
            <Info className={'text-center'} type={'warn'} as={'p'}>
                Для востановления пароля нужно ввести почту, привязаную к аккаунту. Мы отправим четерех значный код,
                получение которого нужно будет подтвердить.
            </Info>
            <Input
                id="email"
                error={formState.errors.email?.message || validateError?.email}
                required
                label={'Почта'}
                placeholder={'Почта'}
                {...register('email')}
                defaultValue={searchParams.get('email') || undefined}
            />
            <Button disabled={isLoading} isLoading={isLoading} className={'w-full'}>
                Отправить
            </Button>
        </form>
    );
}
