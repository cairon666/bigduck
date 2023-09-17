import { FormEvent, useCallback, useEffect, useRef } from 'react';
import { isCode } from '@shared/regexp';

export function useConfirmCodeStage(onSubmit: (code: string) => void) {
    const refFirstInput = useRef<HTMLInputElement | null>(null);
    const refSecondInput = useRef<HTMLInputElement | null>(null);
    const refThirdInput = useRef<HTMLInputElement | null>(null);
    const refFourInput = useRef<HTMLInputElement | null>(null);

    /**
     * Устанавливает фокус на инпут при первом открытии
     */
    useEffect(() => {
        refFirstInput.current?.focus();
    }, []);

    const onClick = useCallback(() => {
        if (!refFirstInput.current || !refSecondInput.current || !refThirdInput.current || !refFourInput.current) {
            return;
        }

        // если поля пустые
        if (
            !refFirstInput.current.value ||
            !refSecondInput.current.value ||
            !refThirdInput.current.value ||
            !refFourInput.current.value
        ) {
            return;
        }

        onSubmit(
            `${refFirstInput.current.value}${refSecondInput.current.value}${refThirdInput.current.value}${refFourInput.current.value}`,
        );
    }, [refFirstInput, refSecondInput, refThirdInput, refFourInput]);

    const onInput = useCallback(
        (e: FormEvent<HTMLInputElement>) => {
            if (!refFirstInput.current || !refSecondInput.current || !refThirdInput.current || !refFourInput.current) {
                return;
            }

            // проверка что value это число
            if (e.currentTarget.value.length !== 0 && Number.isNaN(Number(e.currentTarget.value))) {
                // reset если не число
                e.currentTarget.value = '';
                return;
            }

            // если поле пустое
            if (e.currentTarget.value.length === 0) {
                return;
            }
            if (isCode(e.currentTarget.value)) {
                // если вставили уже весь код (ctrl+v)
                const value = e.currentTarget.value;

                //  устанавливаем значения в ингпуты
                refFirstInput.current.value = value[0];
                refSecondInput.current.value = value[1];
                refThirdInput.current.value = value[2];
                refFourInput.current.value = value[3];

                // сбрасываем фокус
                e.currentTarget.blur();

                onClick();
                return;
            }
            if (e.currentTarget.value.length > 1) {
                // кладем последний элемент
                e.currentTarget.value = e.currentTarget.value[e.currentTarget.value.length - 1];
            }

            switch (e.currentTarget.name) {
                case 'firstNumber':
                    refSecondInput.current.focus();
                    break;
                case 'secondNumber':
                    refThirdInput.current.focus();
                    break;
                case 'thirdNumber':
                    refFourInput.current.focus();
                    break;
                case 'fourNumber':
                    refFourInput.current.blur();
                    onClick();
                    break;
                default:
                    throw new Error('useConfirmCodeStage: onInput: unknown name');
            }
        },
        [refFirstInput, refSecondInput, refThirdInput, refFourInput, onClick],
    );

    return {
        refFirstInput,
        refSecondInput,
        refThirdInput,
        refFourInput,
        onClick,
        onInput,
    };
}
