import { useCallback } from 'react';
import { Info, Input, Button } from '@shared/uikit';
import { useRecoverConfirm } from '../../api';
import { TimerBlock } from './TimerBlock';
import { useConfirmCodeStage } from './useConfirmCodeStage';

export function ConfirmForm() {
    const {
        isLoading,
        isError,
        mutate: postRecoverConfirm,
    } = useRecoverConfirm({
        onError: () => {},
    });

    const onSubmit = useCallback((code: string) => {
        postRecoverConfirm(code);
    }, []);

    const { refFirstInput, refSecondInput, refThirdInput, refFourInput, onClick, onInput } =
        useConfirmCodeStage(onSubmit);

    return (
        <form className="flex flex-col gap-2">
            <Info className="text-center" type="warn" as="p">
                Введите код, который мы выслали на почту
            </Info>
            <div className="flex justify-between gap-2">
                <Input
                    name="firstNumber"
                    placeholder="0"
                    ref={refFirstInput}
                    onInput={onInput}
                    className="text-center"
                    isError={isError}
                />
                <Input
                    name="secondNumber"
                    className="text-center"
                    placeholder="0"
                    ref={refSecondInput}
                    onInput={onInput}
                    isError={isError}
                />
                <Input
                    name="thirdNumber"
                    className="text-center"
                    placeholder="0"
                    ref={refThirdInput}
                    onInput={onInput}
                    isError={isError}
                />
                <Input
                    name="fourNumber"
                    className="text-center"
                    placeholder="0"
                    ref={refFourInput}
                    onInput={onInput}
                    isError={isError}
                />
            </div>
            <TimerBlock />
            <Button type="button" onClick={onClick} disabled={isLoading} isLoading={isLoading} className="w-full">
                Отправить
            </Button>
        </form>
    );
}
