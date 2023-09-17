import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useContext, useState } from 'react';
import { DatePickerContext } from '../DatePickerContext';
import { ChangeArrows } from '../components/ChangeArrows';
import { ChooseMonth } from '../components/ChooseMonth';
import { ChooseYear } from '../components/ChooseYear';
import { DayGrid, DayOfTheWeek } from '../components/DayGrid';
import { MonthGrid } from '../components/MonthGrid';
import { YearGrid } from '../components/YearGrid';

enum stageEnum {
    year = 'year',
    month = 'month',
    day = 'day',
}

function initYearsState(maxDate?: Dayjs, minDate?: Dayjs): { start: number; end: number } {
    return {
        start: maxDate ? maxDate.year() - 11 : dayjs().year() - 11,
        end: maxDate ? maxDate.year() : dayjs().year(),
    };
}

export function DefaultDatePicker() {
    const { chooseDate, currentDate, setCurrentDate, setChooseDate, maxDate, minDate, close } =
        useContext(DatePickerContext);
    const [stage, setStage] = useState<stageEnum>(stageEnum.year);
    const [years, setYears] = useState(initYearsState(maxDate, minDate));

    const onSelectMonth = useCallback((month: number) => {
        setCurrentDate((prev) => prev.set('month', month));
        setChooseDate((prev) => (prev ? prev.set('month', month) : undefined));
        setStage(stageEnum.day);
    }, []);

    const onSelectDay = useCallback((date: Dayjs) => {
        setChooseDate(() => date);
        close();
    }, []);

    const onSelectYear = useCallback((year: number) => {
        setCurrentDate((prev) => prev.set('year', year));
        setChooseDate((prev) => (prev ? prev.set('year', year) : undefined));
        setStage(stageEnum.month);
    }, []);

    const onNextArrow = useCallback(() => {
        if (stage === stageEnum.year) {
            setYears((prev) => ({
                start: prev.start + 12,
                end: prev.end + 12,
            }));
        } else {
            setChooseDate((prev) => {
                setCurrentDate((prev) => prev.add(1, 'month'));
                return prev ? prev.add(1, 'month') : undefined;
            });
        }
    }, [stage]);

    const onPrevArrow = useCallback(() => {
        if (stage === stageEnum.year) {
            setYears((prev) => ({
                start: prev.start - 12,
                end: prev.end - 12,
            }));
        } else {
            setCurrentDate((prev) => prev.add(-1, 'month'));
            setChooseDate((prev) => (prev ? prev.add(-1, 'month') : undefined));
        }
    }, [stage]);

    const onClickChooseMonth = useCallback(() => setStage(stageEnum.month), []);
    const onClickChooseYear = useCallback(() => setStage(stageEnum.year), []);

    return (
        <>
            <div
                className={classNames(
                    'flex items-center justify-between bg-gray-20 px-5',
                    stage === stageEnum.day ? 'pt-2' : 'py-2',
                )}
            >
                <ChooseYear
                    onActive={onClickChooseYear}
                    isActive={stage === stageEnum.year}
                    current={chooseDate ? chooseDate.year() : currentDate.year()}
                />
                <ChooseMonth
                    onActive={onClickChooseMonth}
                    isActive={stage === stageEnum.month}
                    current={chooseDate ? chooseDate.month() : currentDate.month()}
                />
                <ChangeArrows onNext={onNextArrow} onPrev={onPrevArrow} />
            </div>
            {stage === stageEnum.day && <DayOfTheWeek />}
            <div className="p-2">
                {stage === stageEnum.year && (
                    <YearGrid
                        start={years.start}
                        end={years.end}
                        current={currentDate.year()}
                        onSelect={onSelectYear}
                    />
                )}
                {stage === stageEnum.month && <MonthGrid onSelect={onSelectMonth} value={chooseDate || currentDate} />}
                {stage === stageEnum.day && <DayGrid chose={chooseDate} current={currentDate} onSelect={onSelectDay} />}
            </div>
        </>
    );
}
