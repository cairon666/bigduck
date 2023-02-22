import { Transition } from '@headlessui/react';
import { Fragment, useCallback, useRef, useState } from 'react';

import { useOnClickOutside } from '../../../../hooks';
import { Button, Card } from '../../../../components/ui';

export function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    useOnClickOutside(ref, () => {
        onClose();
    });

    return (
        <div className='relative'>
            <Button
                onFocus={onOpen}
                onClick={onOpen}
                onlyIcon
                containerClassName={
                    'flex h-[40px] w-[40px] cursor-pointer flex-col items-center justify-center gap-1 rounded bg-yellow-600 p-2 hover:bg-yellow-700'
                }
                className={'!p-0'}
            >
                <div className={'h-[2px] w-full rounded bg-white'} />
                <div className={'h-[2px] w-full rounded bg-white'} />
                <div className={'h-[2px] w-full rounded bg-white'} />
            </Button>
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
                <Card
                    ref={ref}
                    className={
                        'p-2 shadow scrollbar absolute left-0 top-[calc(100%+0.25rem)] z-20 flex max-h-72 w-56 flex-col gap-1 overflow-y-auto '
                    }
                >
                    <div>какая-то информация</div>
                    <div>об меню</div>
                </Card>
            </Transition>
        </div>
    );
}
