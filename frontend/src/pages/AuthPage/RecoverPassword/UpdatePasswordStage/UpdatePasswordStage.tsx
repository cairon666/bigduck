import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, ref, string } from 'yup';

import { Button, Input } from '../../../../components/ui';
import { ApiErrorCodes } from '../../../../services/Api';
import _i18n from '../../../../services/i18n';
import { RecoverPasswordUpdateAction, useAppDispatch } from '../../../../services/Redux';
import { ErrorBlock, ErrorsTypes } from './ErrorBlock';

interface UpdatePasswordStageProps {
    email: string;
    onNext: () => void;
}

interface FormFields {
    password: string;
    repeatPassword: string;
}

const formScheme = object<FormFields>({
    password: string().required(_i18n.auth.PasswordRequired),
    repeatPassword: string()
        .required(_i18n.auth.RepeatPasswordRequired)
        .oneOf([ref('password')], _i18n.auth.RepeatPasswordShouldEqual),
});

export function UpdatePasswordStage(props: UpdatePasswordStageProps) {
    const { register, handleSubmit, formState, setError, reset } = useForm<FormFields>({
        resolver: yupResolver(formScheme),
    });
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<ErrorsTypes | undefined>(undefined);

    const onSubmit = useCallback(
        (data: FormFields) => {
            setApiError(undefined);
            setIsLoading(true);

            dispatch(
                RecoverPasswordUpdateAction({
                    data: {
                        email: props.email,
                        password: data.password,
                    },
                    onError: (apiErr) => {
                        for (const err of apiErr.errors) {
                            switch (err.code) {
                                case ApiErrorCodes.CodeShortPassword:
                                    setError('password', { message: _i18n.auth.ShortPasswordMessage });
                                    break;
                                case ApiErrorCodes.CodeRecoverEmailNotConfirm:
                                    setApiError(ErrorsTypes.EmailNotConfirm);
                                    break;
                                case ApiErrorCodes.CodeNewPasswordEqualOldPassword:
                                    reset();
                                    setApiError(ErrorsTypes.EqualOldPassword);
                                    break;
                            }
                        }
                    },
                    onEnd: () => {
                        setIsLoading(false);
                    },
                    onSuccess: () => {
                        props.onNext();
                    },
                }),
            );
        },
        [props.onNext],
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-2'}>
            <Input
                required
                fullWidth
                label={_i18n.auth.Password}
                placeholder={_i18n.auth.Password}
                type={'password'}
                errorLabel={formState.errors.password?.message}
                {...register('password')}
            />
            <Input
                required
                fullWidth
                label={_i18n.auth.RepeatPassword}
                placeholder={_i18n.auth.RepeatPassword}
                type={'password'}
                errorLabel={formState.errors.repeatPassword?.message}
                {...register('repeatPassword')}
            />
            <ErrorBlock error={apiError} />
            <Button disabled={isLoading} isLoading={isLoading}>
                {_i18n.auth.Send}
            </Button>
        </form>
    );
}
