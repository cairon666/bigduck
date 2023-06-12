import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { object, string } from 'yup';

import { Button, Info, Input } from '../../../../components/ui';
import { ApiErrorCodes } from '../../../../services/Api';
import _i18n from '../../../../services/i18n';
import { RecoverPasswordSendAction, useAppDispatch } from '../../../../services/Redux';

interface SendEmailStageProps {
    setEmail: (email: string) => void;
    onNext: () => void;
}

interface SendEmailForm {
    email: string;
}

const formScheme = object<SendEmailForm>({
    email: string().required('Почта обязательное поле').email('Неправильный формат почты'),
});

export function SendEmailStage(props: SendEmailStageProps) {
    const { setError, getValues, register, handleSubmit, formState } = useForm<SendEmailForm>({
        resolver: yupResolver(formScheme),
    });
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // for init email
    const [searchParams] = useSearchParams();

    const onValidSubmit = useCallback(
        (data: SendEmailForm) => {
            setIsLoading(true);

            dispatch(
                RecoverPasswordSendAction({
                    data: data,
                    onEnd: () => {
                        setIsLoading(false);
                    },
                    onSuccess: () => {
                        props.setEmail(getValues().email);
                        props.onNext();
                    },
                    onError: (apiErr) => {
                        for (const error of apiErr.errors) {
                            switch (error.code) {
                                case ApiErrorCodes.CodeBadEmail:
                                    setError('email', { message: _i18n.auth.EmailBadFormat });
                                    break;
                                case ApiErrorCodes.CodeNotFound:
                                    setError('email', { message: _i18n.auth.EmailNotFound });
                                    break;
                            }
                        }
                    },
                }),
            );
        },
        [props.setEmail, props.onNext],
    );

    return (
        <form onSubmit={handleSubmit(onValidSubmit)} className={'flex flex-col items-center gap-2'}>
            <Info className={'text-center'} type={'warn'} as={'p'}>
                {_i18n.auth.SendEmailInfoBlock}
            </Info>
            <Input
                id='email'
                errorLabel={formState.errors.email?.message}
                required
                label={_i18n.auth.Mail}
                placeholder={_i18n.auth.Mail}
                fullWidth
                {...register('email')}
                defaultValue={searchParams.get('email') || undefined}
            />
            <Button disabled={isLoading} isLoading={isLoading} className={'w-full'}>
                {_i18n.auth.Send}
            </Button>
        </form>
    );
}
