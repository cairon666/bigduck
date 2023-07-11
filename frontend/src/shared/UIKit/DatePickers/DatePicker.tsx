import { Transition } from "@headlessui/react";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import React, {
    ForwardedRef,
    Fragment,
    ReactNode,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { AiOutlineCalendar } from "react-icons/ai";

import { OutsideClickWrapper, useModal } from "../../hooks";
import { Input, InputProps } from "../Input";
import { DDMMYYYYWithDot, DatePickerAdapter } from "./DatePickerAdapter";
import { DatePickerContext } from "./DatePickerContext";

export type DataTimePickerProps = {
    children?: ReactNode;
    // DatePickerAdapter - how date was display. default is DDMMYYYWithDot
    adapter?: DatePickerAdapter;
    inputProps?: Omit<InputProps, "ref">;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    initDate?: Dayjs;
    onChange?: (value: Dayjs | undefined) => void;
    className?: string;
    classNameContent?: string;
    fullWidth?: boolean;
};
export const DatePicker = forwardRef(function DatePicker(
    {
        initDate,
        adapter = DDMMYYYYWithDot,
        children,
        minDate,
        maxDate,
        onChange,
        inputProps,
        className,
        classNameContent,
        fullWidth,
    }: DataTimePickerProps,
    ref: ForwardedRef<HTMLInputElement>,
) {
    const refInput = useRef<HTMLInputElement | null>(null);
    const [chooseDate, setChooseDate] = useState<Dayjs | undefined>(initDate);
    const [currentDate, setCurrentDate] = useState<Dayjs>(initDate || dayjs());

    const { isOpen, onClose, onOpen } = useModal();

    const onChangeChooseDate = useCallback(
        (cb: (prev: Dayjs | undefined) => Dayjs | undefined) => {
            setChooseDate((prev) => {
                const newDate = cb(prev);
                onChange?.(newDate);
                return newDate;
            });
        },
        [onChange],
    );

    const classNameInput = classNames(inputProps?.className, {
        ["w-full"]: fullWidth,
    });

    useImperativeHandle(ref, () => refInput.current as HTMLInputElement);

    return (
        <DatePickerContext.Provider
            value={{
                chooseDate: chooseDate,
                setChooseDate: onChangeChooseDate,
                currentDate: currentDate,
                setCurrentDate: setCurrentDate,
                minDate: minDate,
                maxDate: maxDate,
                close: onClose,
            }}
        >
            <OutsideClickWrapper className={classNames(className, "relative ")} onOutsideClick={onClose}>
                <Input
                    onFocus={onOpen}
                    onClick={onOpen}
                    type="text"
                    ref={refInput}
                    readOnly
                    value={adapter(chooseDate) || ""}
                    rightIcon={<AiOutlineCalendar className={"h-4 w-4 text-gray-600"} />}
                    {...inputProps}
                    className={classNameInput}
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
                            top: "calc(100% + 4px)",
                        }}
                        className={classNames(
                            classNameContent,
                            "absolute left-2/4 z-10 -translate-x-2/4 rounded border bg-white shadow",
                        )}
                    >
                        {children}
                    </div>
                </Transition>
            </OutsideClickWrapper>
        </DatePickerContext.Provider>
    );
});
