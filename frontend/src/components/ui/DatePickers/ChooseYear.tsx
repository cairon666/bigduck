import classNames from 'classnames';
import { memo, useCallback, useMemo, useRef } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import { useOnClickOutside } from '../../../hooks';
import styles from './Datapicker.module.scss';
import { useModal } from './useModal';

interface ChooseYearProps {
    current: Date;
    onSelect: (year: number) => void;
    startData?: Date;
    endData?: Date;
}

export const ChooseYear = memo(function ChooseYear(props: ChooseYearProps) {
    const refCard = useRef(null);
    const { isOpen, onOpen, onClose } = useModal();

    const onSelectClick = useCallback(
        (year: number) => () => {
            props.onSelect(year);
            onClose();
        },
        [props.onSelect],
    );

    // possibleYears - generate years from start data to end data
    const possibleYears = useMemo<number[]>(() => {
        let start = props.startData ? props.startData : new Date(0);
        const current = props.endData ? props.endData : new Date();
        const arr: number[] = [];

        while (start.getFullYear() <= current.getFullYear()) {
            arr.push(start.getFullYear());
            start = new Date(start.setFullYear(start.getFullYear() + 1));
        }

        return arr;
    }, [props.startData, props.endData]);

    useOnClickOutside(refCard, () => {
        onClose();
    });

    return (
        <div className={'relative'}>
            <button type={'button'} className={'flex cursor-pointer items-center gap-1 font-medium'} onClick={onOpen}>
                <div>{props.current.getFullYear()}</div>
                <RiArrowDownSLine className={'h-4 w-4 text-gray-700'} />
            </button>
            <div className={classNames(styles.start, isOpen ? styles.end : '')}>
                <div
                    ref={refCard}
                    className={
                        'scrollbar absolute left-2/4 flex h-32 w-16 -translate-x-2/4 flex-col overflow-y-auto rounded border border-gray-100 bg-white text-center'
                    }
                >
                    {possibleYears.map((item) => {
                        return (
                            <button
                                type={'button'}
                                className={classNames(
                                    'cursor-pointer hover:bg-gray-100',
                                    item === props.current.getFullYear() ? 'bg-gray-200 hover:bg-gray-300' : '',
                                )}
                                onClick={onSelectClick(item)}
                                key={item}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});
