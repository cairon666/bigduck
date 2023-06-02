import classNames from 'classnames';
import { CSSProperties, ForwardedRef, forwardRef, memo, useCallback, useEffect, useState } from 'react';

import { Button } from '../Button';
import { CellOfCalendar, CellOfCalendarProps } from './CellOfCalendar';
import { ChangeMonthArrows } from './ChangeMonthArrows';
import { ChooseMonth } from './ChooseMonth';
import { ChooseYear } from './ChooseYear';
import styles from './Datapicker.module.scss';
import { dateIs } from './utils';

export interface CalendarProps {
    chooseDate: Date | null;
    onChange: (d: Date | null) => () => void;
    isOpen?: boolean;
    style?: CSSProperties;
    minDate?: Date;
    maxDate?: Date;
    onReset?: () => void;
}

export const Calendar = forwardRef(function Calendar(
    { style, isOpen, onChange, minDate, maxDate, onReset, chooseDate }: CalendarProps,
    ref: ForwardedRef<HTMLDivElement>,
) {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [calendarArray, setCalendarArray] = useState<CellOfCalendarProps[]>([]);

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
        <div
            ref={ref}
            className={classNames(
                styles.start,
                isOpen ? styles.end : '',
                'absolute z-50 w-max rounded bg-white shadow-md',
            )}
            style={style}
        >
            <div className={'relative flex items-center justify-between rounded bg-gray-20 p-2'}>
                <ChooseYear startData={minDate} endData={maxDate} current={currentDate} onSelect={onChangeYear} />
                <ChooseMonth current={currentDate} onSelect={onChangeMonth} />
                <ChangeMonthArrows onNext={onChangeNextMonth} onPrev={onChangePrevMonth} />
            </div>
            <DayOfTheWeek />
            <CellGrid calendarArray={calendarArray} onChange={onChange} />
            <div className={'flex items-center justify-end bg-gray-20 px-2 py-1'}>
                <Button type={'button'} onClick={onReset}>
                    Сбросить
                </Button>
            </div>
        </div>
    );
});

interface CellGridProps {
    calendarArray: CellOfCalendarProps[];
    onChange: (d: Date | null) => () => void;
}

const CellGrid = memo(function CellGrid(props: CellGridProps) {
    return (
        <div className={'grid grid-cols-[repeat(7,2rem)] gap-x-2 gap-y-2 p-2'}>
            {props.calendarArray.map((item, index) => {
                return <CellOfCalendar key={index} onClick={props.onChange(item.date)} {...item} />;
            })}
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
