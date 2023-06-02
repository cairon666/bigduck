import { InputHTMLAttributes, Ref, forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';

import { useOnClickOutside } from '../../../hooks';
import { Error } from '../_Error';
import { Label } from '../_Label';
import { Calendar } from './Calendar';
import { useModal } from './useModal';
import { positionProps, usePosition } from './usePosition';
import { dateToFullString } from './utils';

export type DataTimePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    initDate?: Date;
    placeholder?: string;
    label?: string;
    required?: boolean;
    error?: string;
    minDate?: Date;
    maxDate?: Date;
    onChange?: (date: Date | null) => void;
    position?: positionProps;
};

export const DatePicker = forwardRef(function DataTimePicker(
    {
        initDate,
        placeholder,
        label,
        required,
        error,
        onChange,
        position,
        minDate,
        maxDate,
        ...otherProps
    }: DataTimePickerProps,
    ref: Ref<HTMLInputElement | null>,
) {
    const refCalendar = useRef<HTMLDivElement | null>(null);
    const refInput = useRef<HTMLInputElement | null>(null);
    const refBlock = useRef<HTMLInputElement | null>(null);

    const { isOpen, onOpen, onClose } = useModal();
    const { style } = usePosition({
        refInput: refInput,
        refCalendar: refCalendar,
        position: position,
    });

    const [chooseDate, setChooseDate] = useState<Date | null>(initDate || null);
    const onChangeHandler = useCallback(
        (date: Date | null) => () => {
            setChooseDate(date);
            onClose();

            if (onChange) {
                onChange(date);
            }
        },
        [onChange],
    );

    const onReset = useCallback(() => {
        setChooseDate(null);
        if (onChange) {
            onChange(null);
        }
    }, [onChange]);

    useOnClickOutside(refBlock, () => {
        onClose();
    });

    useImperativeHandle(ref, () => refInput.current);

    return (
        <div ref={refBlock} className={'relative flex flex-col'}>
            {/* input */}
            <Label label={label} required={required} />
            <label className={'relative w-full'}>
                <input
                    type='text'
                    {...otherProps}
                    ref={refInput}
                    readOnly
                    value={chooseDate ? dateToFullString(chooseDate) : ''}
                    onClick={onOpen}
                    onFocus={onOpen}
                    placeholder={placeholder || 'Выбрать'}
                    className={`h-8 w-full cursor-pointer items-center  rounded border 
                    border-gray-200 py-4 px-2 hover:border-gray-600 focus-visible:border-gray-600 
                    focus-visible:outline-none`}
                />
                <div className={'absolute top-2/4 right-2 -translate-y-2/4 cursor-pointer'}>
                    <AiOutlineCalendar className={'h-4 w-4 text-gray-600'} />
                </div>
            </label>
            <Error error={error} />
            <Calendar
                ref={refCalendar}
                isOpen={isOpen}
                style={style}
                chooseDate={chooseDate}
                onReset={onReset}
                onChange={onChangeHandler}
                minDate={minDate}
                maxDate={maxDate}
            />
        </div>
    );
});
