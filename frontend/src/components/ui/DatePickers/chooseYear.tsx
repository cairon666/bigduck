import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useCallback, useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import { useOnClickOutside } from '../../../hooks';

interface ChooseYearProps {
    current: Date;
    onSelect: (year: number) => void;
}

const possibleYears = possibleYearsGen();

export function ChooseYear(props: ChooseYearProps) {
    const [isOpen, setIsOpen] = useState(false);
    const refCard = useRef(null);

    useOnClickOutside(refCard, () => {
        setIsOpen(false);
    });

    const onOpenClick = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onSelectClick = useCallback(
        (year: number) => () => {
            props.onSelect(year);
            setIsOpen(false);
        },
        [props.onSelect],
    );

    return (
        <div className={'relative'}>
            <div className={'flex cursor-pointer items-center gap-1 font-medium'} onClick={onOpenClick}>
                <div>{props.current.getFullYear()}</div>
                <RiArrowDownSLine className={'h-4 w-4 text-gray-700'} />
            </div>
            <Transition
                show={isOpen}
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
            >
                <div
                    ref={refCard}
                    className={
                        'scrollbar absolute left-2/4 h-32 w-16 -translate-x-2/4 overflow-y-auto rounded border border-gray-100 bg-white text-center'
                    }
                >
                    {possibleYears.map((item) => {
                        return (
                            <div
                                className={classNames(
                                    'cursor-pointer hover:bg-gray-100',
                                    item === props.current.getFullYear() ? 'bg-gray-200 hover:bg-gray-300' : '',
                                )}
                                onClick={onSelectClick(item)}
                                key={item}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </Transition>
        </div>
    );
}

function possibleYearsGen(): number[] {
    let start = new Date(0);
    const current = new Date();
    const arr: number[] = [];

    while (start.getFullYear() != current.getFullYear()) {
        arr.push(start.getFullYear());
        start = new Date(start.setFullYear(start.getFullYear() + 1));
    }

    return arr;
}
