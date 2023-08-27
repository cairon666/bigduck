import classNames from 'classnames';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

const possibleMonths = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

export interface ChooseMonthProps {
    onActive?: () => void;
    isActive?: boolean;
    current: number;
}

export function ChooseMonth({ onActive, isActive, current }: ChooseMonthProps) {
    return (
        <button type="button" className={'flex items-center gap-2'} onClick={onActive}>
            <span className={classNames('font-medium', isActive ? 'text-yellow-700' : '')}>
                {possibleMonths[current]}
            </span>
            {isActive ? <RiArrowUpSLine className={'h-4 w-4'} /> : <RiArrowDownSLine className={'h-4 w-4'} />}
        </button>
    );
}
