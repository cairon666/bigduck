import classNames from 'classnames';

export interface YearGridProps {
    onSelect: (year: number) => void;
    start: number;
    end: number;
    current: number;
}

export function YearGrid({ onSelect, start, end, current }: YearGridProps) {
    return (
        <div className="grid grid-cols-4">
            {new Array(end + 1 - start).fill(null).map((_, index) => {
                const year = start + index;
                const isActive = current === year;
                const className = classNames(
                    'items-center flex justify-center hover:bg-gray-20 h-[50px] text-gray-1000 font-light',
                    isActive ? 'font-normal bg-gray-20' : '',
                );

                return (
                    <button onClick={() => onSelect(year)} className={className} type="button" key={year}>
                        {year}
                    </button>
                );
            })}
        </div>
    );
}
