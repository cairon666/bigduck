import classNames from 'classnames';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

export interface ChooseYearProps {
    onActive?: () => void;
    isActive?: boolean;
    current: number;
}

export function ChooseYear({ isActive, onActive, current }: ChooseYearProps) {
    return (
        <button type="button" className="flex items-center gap-2" onClick={onActive}>
            <span className={classNames('font-medium', isActive ? 'text-yellow-700' : '')}>{current}</span>
            {isActive ? <RiArrowUpSLine className="h-4 w-4" /> : <RiArrowDownSLine className="h-4 w-4" />}
        </button>
    );
}
