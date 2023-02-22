import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, InputHTMLAttributes, forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';

import { useOnClickOutside } from '../../../hooks';
import { Error } from '../_Error';
import { Label } from '../_Label';
import { Button } from '../Button';
import { ChangeMonthArrows } from './changeMonthArrows';
import { ChooseMonth } from './chooseMonth';
import { ChooseYear } from './chooseYear';
import { dateIs, dateToFullString } from './utils';

export type DataTimePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    initDate?: Date;
    placeholder?: string;
    label?: string;
    required?: boolean;
    error?: string;
    // minDate?: Date; // TODO
    // maxDate?: Date;
    onChange?: (date: Date | null) => void;
};

export const DatePicker = forwardRef<HTMLInputElement, DataTimePickerProps>(function DataTimePicker(props, ref) {
    const {
        initDate,
        placeholder,
        label,
        required,
        error,
        onChange,
        // minDate = new Date(0),
        // maxDate = new Date(),
        ...otherProps
    } = props;

    const [calendarIsOpen, setCalendarIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [chooseDate, setChooseDate] = useState<Date | null>(initDate || null);
    const [calendarArray, setCalendarArray] = useState<Array<CellOfCalendarProps>>([]);

    const calendarRef = useRef(null);

    const onOpenCalendar = useCallback(() => {
        setCalendarIsOpen(true);
    }, []);

    const onCloseCalendar = useCallback(() => {
        setCalendarIsOpen(false);
    }, []);

    const onClickCell = useCallback(
        (date: Date) => () => {
            setChooseDate(date);
            onCloseCalendar();

            if (onChange) {
                onChange(date);
            }
        },
        [onChange],
    );

    useOnClickOutside(calendarRef, () => {
        setCalendarIsOpen(false);
    });

    const onChangeYear = useCallback((year: number) => {
        setCurrentDate((prev) => {
            return new Date(prev.setFullYear(year));
        });
    }, []);

    const onChangeMonth = useCallback((month: number) => {
        setCurrentDate((prev) => {
            return new Date(prev.setMonth(month));
        });
    }, []);

    const onChangeNextMonth = useCallback(() => {
        setCurrentDate((prev) => {
            if (prev.getMonth() == 11) {
                return new Date(prev.getFullYear() + 1, 0, prev.getDay());
            } else {
                return new Date(prev.getFullYear(), prev.getMonth() + 1, prev.getDay());
            }
        });
    }, []);

    const onChangePrevMonth = useCallback(() => {
        setCurrentDate((prev) => {
            if (prev.getMonth() == 0) {
                return new Date(prev.getFullYear() - 1, 11, prev.getDay());
            } else {
                return new Date(prev.getFullYear(), prev.getMonth() - 1, prev.getDay());
            }
        });
    }, []);

    const onResetChoose = useCallback(() => {
        setChooseDate(null);
        if (onChange) {
            onChange(null);
        }
    }, [onChange]);

    // render calendar items
    useEffect(() => {
        // Первый день недели в выбранном месяце
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 7).getDay();
        // Последний день выбранного месяца
        const lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        // Последний день предыдущего месяца
        const lastDayOfLastMonth =
            currentDate.getMonth() == 0
                ? new Date(currentDate.getFullYear() - 1, 11, 0).getDate()
                : new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

        // цикл добавления ячеек
        const arr: CellOfCalendarProps[] = [];
        let i = 1;
        do {
            let dow = new Date(currentDate.getFullYear(), currentDate.getMonth(), i).getDay();
            // Если первый день недели не понедельник показать последние дни предыдущего месяца
            if (i == 1 && dow !== 1) {
                let k = lastDayOfLastMonth - firstDayOfMonth + 1;
                for (let j = 0; j < firstDayOfMonth; j++) {
                    const current = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, k);
                    if (dateIs(current, chooseDate)) {
                        arr.push({
                            type: 'select',
                            disable: true,
                            date: current,
                        });
                    } else {
                        arr.push({
                            type: 'normal',
                            disable: true,
                            date: current,
                        });
                    }

                    k++;
                }
            }

            // Записываем текущий день в цикл
            const current = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            if (dateIs(current, chooseDate)) {
                arr.push({
                    type: 'select',
                    date: current,
                });
            } else {
                arr.push({
                    type: 'normal',
                    date: current,
                });
            }

            // Если последний день месяца не воскресенье, показать первые дни следующего месяца
            if (i == lastDateOfMonth && dow !== 0) {
                let k = 1;
                for (dow; dow < 7; dow++) {
                    const current = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, k);
                    if (dateIs(current, chooseDate)) {
                        arr.push({
                            type: 'select',
                            disable: true,
                            date: current,
                        });
                    } else {
                        arr.push({
                            type: 'normal',
                            disable: true,
                            date: current,
                        });
                    }
                    k++;
                }
            }
            i++;
        } while (i <= lastDateOfMonth);

        setCalendarArray(arr);
    }, [currentDate, chooseDate]);

    return (
        <div className={'relative flex flex-col'}>
            <Label label={label} required={required} />
            <div
                tabIndex={0}
                onClick={onOpenCalendar}
                onFocus={onOpenCalendar}
                className={
                    'flex h-8 w-full cursor-pointer items-center items-center justify-between rounded border border-gray-200 py-4 px-2 hover:border-gray-600 focus-visible:border-gray-600 focus-visible:outline-none'
                }
            >
                {chooseDate ? (
                    <div>{dateToFullString(chooseDate)}</div>
                ) : (
                    <div className={'text-gray-200'}>{placeholder || 'Выбрать'}</div>
                )}
                <AiOutlineCalendar className={'h-4 w-4 text-gray-600'} />
            </div>
            <Error error={error} />
            <input {...otherProps} type='text' hidden readOnly ref={ref} />

            <Transition
                show={calendarIsOpen}
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
            >
                <div
                    ref={calendarRef}
                    className={'absolute bottom-full left-2/4 z-50 w-max -translate-x-2/4 rounded !bg-white shadow-md'}
                >
                    <div className={'relative flex items-center justify-between rounded bg-gray-20 p-2'}>
                        <ChooseYear current={currentDate} onSelect={onChangeYear} />
                        <ChooseMonth current={currentDate} onSelect={onChangeMonth} />
                        <ChangeMonthArrows onNext={onChangeNextMonth} onPrev={onChangePrevMonth} />
                    </div>
                    <DayOfTheWeek />
                    <div className={'grid grid-cols-[repeat(7,2rem)] gap-x-2 gap-y-2 p-2'}>
                        {calendarArray.map((item, index) => {
                            return <CellOfCalendar key={index} onClick={onClickCell(item.date)} {...item} />;
                        })}
                    </div>
                    <div className={'flex items-center justify-end bg-gray-20 px-2 py-1'}>
                        <Button type={'button'} onClick={onResetChoose}>
                            Сбросить
                        </Button>
                    </div>
                </div>
            </Transition>
        </div>
    );
});

const DayOfTheWeek = memo(function DayOfTheWeek() {
    return (
        <div className={'grid grid-cols-7 gap-1 bg-gray-20 p-2 text-gray-100'}>
            <div className={'px-2'}>Пн</div>
            <div className={'px-2'}>Вт</div>
            <div className={'px-2'}>Ср</div>
            <div className={'px-2'}>Чт</div>
            <div className={'px-2'}>Пт</div>
            <div className={'px-2 text-gray-200'}>Сб</div>
            <div className={'px-2 text-gray-200'}>Вс</div>
        </div>
    );
});

interface CellOfCalendarProps {
    type: 'select' | 'normal';
    disable?: boolean;
    today?: boolean;
    date: Date;
    onClick?: () => void;
}

const CellOfCalendar = memo(function CellOfCalendar(props: CellOfCalendarProps) {
    return (
        <div
            onClick={props.onClick}
            className={classNames(
                'h-8 w-8 cursor-pointer rounded border border-transparent p-2 text-center text-sm',
                props.today ? 'bg-gray-20 text-gray-600' : '',
                props.type === 'normal' ? 'text-gray-1000 hover:!border-yellow-600' : '',
                props.type === 'select' ? '!bg-yellow-600 !text-gray-1000 hover:!bg-yellow-800' : '',
                props.disable ? 'bg-gray-40 text-gray-300' : '',
            )}
        >
            {props.date.getDate()}
        </div>
    );
});
