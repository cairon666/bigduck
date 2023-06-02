import classNames from 'classnames';
import { memo, useCallback, useRef } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import { useOnClickOutside } from '../../../hooks';
import styles from './Datapicker.module.scss';
import { useModal } from './useModal';

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

interface ChooseMonthProps {
    current: Date;
    onSelect: (month: number) => void;
}

export const ChooseMonth = memo(function ChooseMonth(props: ChooseMonthProps) {
    const { isOpen, onOpen, onClose } = useModal();
    const refCard = useRef(null);

    const onSelectClick = useCallback(
        (month: number) => () => {
            props.onSelect(month);
            onClose();
        },
        [props.onSelect],
    );

    useOnClickOutside(refCard, () => {
        onClose();
    });

    return (
        <div className={'absolute left-2/4 -translate-x-2/4'}>
            <button
                type={'button'}
                className={'flex w-24 cursor-pointer items-center justify-center gap-1 font-medium'}
                onClick={onOpen}
            >
                <div>{possibleMonths[props.current.getMonth()]}</div>
                <RiArrowDownSLine className={'h-4 w-4 text-gray-700'} />
            </button>
            <div className={classNames(styles.start, isOpen ? styles.end : '')}>
                <div
                    ref={refCard}
                    className={
                        'scrollbar absolute left-2/4 flex h-32 w-24 -translate-x-2/4 flex-col overflow-y-auto rounded border border-gray-100 bg-white text-center'
                    }
                >
                    {possibleMonths.map((item, index) => {
                        return (
                            <button
                                type={'button'}
                                className={classNames(
                                    'cursor-pointer hover:bg-gray-100',
                                    index === props.current.getMonth() ? 'bg-gray-200 hover:bg-gray-300' : '',
                                )}
                                onClick={onSelectClick(index)}
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
