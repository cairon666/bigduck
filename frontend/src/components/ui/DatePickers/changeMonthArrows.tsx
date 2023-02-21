import { memo } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

export interface ChangeMonthArrowsProps {
    onNext?: () => void;
    onPrev?: () => void;
}

export const ChangeMonthArrows = memo(function ChangeMonthArrows(props: ChangeMonthArrowsProps) {
    // TODO сейчас датапике скачет при выборе другоого месяца если число недель больше/меньше
    return (
        <div className={'flex items-center gap-2'}>
            <RiArrowLeftSLine
                onClick={props.onPrev}
                className={'h-5 w-5 cursor-pointer rounded-full bg-gray-60 text-gray-900'}
            />
            <RiArrowRightSLine
                onClick={props.onNext}
                className={'h-5 w-5 cursor-pointer rounded-full bg-gray-60 text-gray-900'}
            />
        </div>
    );
});
