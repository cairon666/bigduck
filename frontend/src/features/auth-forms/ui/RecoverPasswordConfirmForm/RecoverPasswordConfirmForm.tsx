import { postRecoverPasswordConfirm, postRecoverPasswordSend, useRecoverPasswordViewer } from '@/features/auth-forms';
import { useAppDispatch } from '@/shared/hooks';
import { Button, Info, Input } from '@/shared/UIKit';
import { useCallback } from 'react';

import { TimerBlock } from './TimerBlock';
import { useConfirmCodeStage } from './useConfirmCodeStage';

export function RecoverPasswordConfirmForm() {
    const dispatch = useAppDispatch();
    const {
        email,
        confirm: { isLoading, validateError },
    } = useRecoverPasswordViewer();

    const onRepeatSend = useCallback(() => {
        dispatch(
            postRecoverPasswordSend({
                email: email || '',
            }),
        );
    }, [email]);

    const onSubmit = useCallback(
        (code: string) => {
            dispatch(
                postRecoverPasswordConfirm({
                    email: email || '',
                    code: code,
                }),
            );
        },
        [email],
    );

    const { refFirstInput, refSecondInput, refThirdInput, refFourInput, onClick, onInput } =
        useConfirmCodeStage(onSubmit);

    return (
        <form className={'flex flex-col gap-2'}>
            <Info className={'text-center'} type={'warn'} as={'p'}>
                Введите код, который мы выслали на почту
            </Info>
            <div className={'flex justify-between gap-2'}>
                <Input
                    name={'firstNumber'}
                    placeholder={'0'}
                    ref={refFirstInput}
                    onInput={onInput}
                    className={'text-center'}
                    isError={!!validateError?.code}
                />
                <Input
                    name={'secondNumber'}
                    className={'text-center'}
                    placeholder={'0'}
                    ref={refSecondInput}
                    onInput={onInput}
                    isError={!!validateError?.code}
                />
                <Input
                    name={'thirdNumber'}
                    className={'text-center'}
                    placeholder={'0'}
                    ref={refThirdInput}
                    onInput={onInput}
                    isError={!!validateError?.code}
                />
                <Input
                    name={'fourNumber'}
                    className={'text-center'}
                    placeholder={'0'}
                    ref={refFourInput}
                    onInput={onInput}
                    isError={!!validateError?.code}
                />
            </div>
            <TimerBlock onRepeatSend={onRepeatSend} />
            <Button type={'button'} onClick={onClick} disabled={isLoading} isLoading={isLoading} className={'w-full'}>
                Отправить
            </Button>
        </form>
    );
}
