import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { OutsideClickWrapper, useModal } from '../../hooks';
import { Input, InputProps } from '../Input';
import { SelectContext } from './SelectContext';

export type SelectItemValue = {
    label: string;
    value: string;
};

interface SelectOwnProps {
    initValue?: SelectItemValue;
    value?: SelectItemValue;
    children?: ReactNode;
    onChange?: (value?: SelectItemValue) => void;
    inputProps?: Omit<InputProps, 'value' | 'ref'>;
}

export type SelectProps = SelectOwnProps;

export function Select({ value: valueProps, initValue, inputProps, children, onChange: onChangeProps }: SelectProps) {
    const refInput = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState<SelectItemValue | undefined>(initValue);

    const { isOpen, onOpen, onClose } = useModal();
    const onChange = useCallback(
        (value?: SelectItemValue) => {
            setValue(value);
            onChangeProps?.(value);
            onClose();
        },
        [refInput.current, onChangeProps],
    );

    useEffect(() => {
        setValue(valueProps);
    }, [valueProps]);

    return (
        <SelectContext.Provider value={{ value, change: onChange }}>
            <OutsideClickWrapper onOutsideClick={onClose} className="relative">
                <Input
                    readOnly
                    ref={refInput}
                    value={value?.label || ''}
                    rightIcon={
                        isOpen ? (
                            <RiArrowUpSLine className="h-5 w-5 text-gray-600" />
                        ) : (
                            <RiArrowDownSLine className="h-5 w-5 text-gray-600" />
                        )
                    }
                    {...inputProps}
                    className={classNames('cursor-pointer', inputProps?.className)}
                    onClick={onOpen}
                />
                <Transition
                    show={isOpen}
                    as={Fragment}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0 translate-y-2"
                    enterTo="opacity-100 translate-y-0"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-2"
                >
                    <div
                        style={{
                            top: 'calc(100% + 4px)',
                        }}
                        className="absolute left-0 right-0 z-10 rounded border bg-white px-1 py-2 shadow"
                    >
                        {children}
                    </div>
                </Transition>
            </OutsideClickWrapper>
        </SelectContext.Provider>
    );
}
