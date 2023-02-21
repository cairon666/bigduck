import { Transition } from '@headlessui/react';
import { Fragment, useCallback, useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import { useOnClickOutside } from '../../../../_hooks';
import { Button, Card } from '../../../../components/ui';

export function Profile() {
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
        <div className={'relative'}>
            <Button
                theme={'text'}
                onFocus={onOpen}
                onClick={onOpen}
                className={'group flex cursor-pointer items-center gap-1'}
                onlyIcon
            >
                <div
                    className={
                        'flex h-[40px] w-[40px] items-center justify-center rounded bg-gray-40 text-sm font-medium text-gray-900 group-hover:bg-gray-80'
                    }
                >
                    ЕМ
                </div>
                <RiArrowDownSLine className={'h-5 w-5 text-gray-900'} />
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
                        'scrollbar absolute right-0 top-[calc(100%+0.25rem)] z-20 flex max-h-72 w-56 flex-col gap-1 overflow-y-auto '
                    }
                >
                    <div>какая-то информация</div>
                    <div>об аккаунте</div>
                </Card>
            </Transition>
        </div>
    );
}
