import { useCallback, useState } from 'react';

import { ApiErrorCodes } from '../../../../_api';
import _i18n from '../../../../_i18n';
import { RecoverPasswordConfirmAction, RecoverPasswordSendAction, useAppDispatch } from '../../../../_redux';
import { Button, Info, Input } from '../../../../components/ui';
import { TimerBlock } from './TimerBlock';
import { useConfirmCodeStage } from './useConfirmCodeStage';

interface ConfirmCodeStageProps {
    email: string;
    onNext: () => void;
}

enum CodeError {
    NotValidCode,
    BadCode,
}

export function ConfirmCodeStage(props: ConfirmCodeStageProps) {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<CodeError | undefined>(undefined);

    const onSubmit = useCallback((code: string) => {
        setIsLoading(true);
        setError(undefined);

        dispatch(
            RecoverPasswordConfirmAction({
                data: {
                    email: props.email,
                    code: code,
                },
                onEnd: () => {
                    setIsLoading(false);
                },
                onSuccess: () => {
                    props.onNext();
                },
                onError: (apiErr) => {
                    for (const err of apiErr.errors) {
                        switch (err.code) {
                            case ApiErrorCodes.CodeBadRecoverCode:
                                setError(CodeError.BadCode);
                                break;
                            case ApiErrorCodes.CodeNotValidRecoverCode:
                                setError(CodeError.NotValidCode);
                                break;
                        }
                    }
                },
            }),
        );
    }, []);

    const onRepeatSend = useCallback(() => {
        setIsLoading(true);
        setError(undefined);

        dispatch(
            RecoverPasswordSendAction({
                data: { email: props.email },
                onEnd: () => {
                    setIsLoading(false);
                },
            }),
        );
    }, [props.email]);

    const { refFirstInput, refSecondInput, refThirdInput, refFourInput, onClick, onInput } = useConfirmCodeStage({
        onSubmit: onSubmit,
    });

    return (
        <form className={'flex flex-col gap-2'}>
            <Info className={'text-center'} type={'warn'} as={'p'}>
                {_i18n.auth.ConfirmCodeInfoBlock}
            </Info>
            <div className={'flex justify-between gap-2'}>
                <Input
                    name={'firstNumber'}
                    placeholder={'0'}
                    fullWidth
                    ref={refFirstInput}
                    onInput={onInput}
                    className={'text-center'}
                    error={!!error}
                />
                <Input
                    name={'secondNumber'}
                    className={'text-center'}
                    error={!!error}
                    placeholder={'0'}
                    fullWidth
                    ref={refSecondInput}
                    onInput={onInput}
                />
                <Input
                    name={'thirdNumber'}
                    className={'text-center'}
                    error={!!error}
                    placeholder={'0'}
                    fullWidth
                    ref={refThirdInput}
                    onInput={onInput}
                />
                <Input
                    name={'fourNumber'}
                    className={'text-center'}
                    error={!!error}
                    placeholder={'0'}
                    fullWidth
                    ref={refFourInput}
                    onInput={onInput}
                />
            </div>
            <TimerBlock onRepeatSend={onRepeatSend} />
            <Button type={'button'} onClick={onClick} disabled={isLoading} isLoading={isLoading} className={'w-full'}>
                {_i18n.auth.Send}
            </Button>
        </form>
    );
}
