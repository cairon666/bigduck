import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useMemo } from 'react';

export interface DayGridProps {
    onSelect: (date: Dayjs) => void;
    chose: Dayjs | undefined;
    current: Dayjs;
}

export function DayOfTheWeek() {
    return (
        <div className={'grid grid-cols-7 gap-1 bg-gray-20 px-3 py-2 text-gray-100'}>
            <div className={'px-2'}>Пн</div>
            <div className={'px-2'}>Вт</div>
            <div className={'px-2'}>Ср</div>
            <div className={'px-2'}>Чт</div>
            <div className={'px-2'}>Пт</div>
            <div className={'px-2 text-gray-200'}>Сб</div>
            <div className={'px-2 text-gray-200'}>Вс</div>
        </div>
    );
}

export function DayGrid({ current, chose, onSelect }: DayGridProps) {
    const onClick = useCallback((date: Dayjs) => () => onSelect(date), [onSelect]);

    const items = useMemo(() => getCellsOfMonth(current, chose), [current, chose]);

    return (
        <div className={'grid grid-cols-7 gap-1 p-2'}>
            {items.map((item, index) => {
                return (
                    <button
                        key={index}
                        type="button"
                        onClick={onClick(item.date)}
                        className={classNames(
                            'flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-transparent p-2 text-sm',
                            item.type === 'normal' ? 'text-gray-1000 hover:!border-yellow-600' : '',
                            item.type === 'select' ? '!bg-yellow-600 !text-gray-1000 hover:!bg-yellow-800' : '',
                            item.disable ? 'bg-gray-40 text-gray-300' : '',
                        )}
                    >
                        {item.date.date()}
                    </button>
                );
            })}
        </div>
    );
}

interface CellItem {
    type: 'select' | 'normal';
    disable?: boolean;
    today?: boolean;
    date: Dayjs;
    onClick?: () => void;
}

function getCellsOfMonth(current: Dayjs, chose: Dayjs | undefined): CellItem[] {
    // Понедельник второй недели месяца
    const firstDayOfMonth = new Date(current.year(), current.month(), 7).getDay();
    // Первый день следущего месяца
    const lastDateOfMonth = new Date(current.year(), current.month() + 1, 0).getDate();
    // Последний день предыдущего месяца c проверкой для прошлого года
    const lastDayOfLastMonth =
        current.month() == 0
            ? new Date(current.year() - 1, 11, 0).getDate()
            : new Date(current.year(), current.month(), 0).getDate();

    // цикл добавления ячеек
    const arr: CellItem[] = [];
    let i = 1;

    do {
        let dow = new Date(current.year(), current.month(), i).getDay();
        // Если первый день недели не понедельник показать последние дни предыдущего месяца
        if (i == 1 && dow !== 1) {
            let k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (let j = 0; j < firstDayOfMonth; j++) {
                const newDate = dayjs(new Date(current.year(), current.month() - 1, k));
                arr.push({
                    type: isSelected(chose, newDate) ? 'select' : 'normal',
                    disable: true,
                    date: newDate,
                });
                k++;
            }
        }

        // Записываем текущий день в цикл
        const newDate = dayjs(new Date(current.year(), current.month(), i));
        arr.push({
            type: isSelected(chose, newDate) ? 'select' : 'normal',
            disable: false,
            date: newDate,
        });

        // Если последний день месяца не воскресенье, показать первые дни следующего месяца
        if (i == lastDateOfMonth && dow !== 0) {
            let k = 1;
            for (dow; dow < 7; dow++) {
                const newDate = dayjs(new Date(current.year(), current.month() + 1, k));
                arr.push({
                    type: isSelected(chose, newDate) ? 'select' : 'normal',
                    disable: true,
                    date: newDate,
                });
                k++;
            }
        }
        i++;
    } while (i <= lastDateOfMonth);

    return arr;
}

function isSelected(chose: Dayjs | undefined, newDate: Dayjs): boolean {
    return chose ? newDate.isSame(chose) : false;
}
