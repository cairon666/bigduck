import { Transition } from '@headlessui/react';
import { Fragment, useCallback, useRef, useState } from 'react';
import { MdOutlineNotificationsNone } from 'react-icons/md';

import { useOnClickOutside } from '../../../../_hooks';
import { Button, Card } from '../../../../components/ui';

export function Notify() {
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
        <div className={'relative flex flex h-full items-center justify-center'}>
            <div>
                <Button onClick={onOpen} onFocus={onOpen} theme={'gray'} onlyIcon>
                    <MdOutlineNotificationsNone className={'h-5 w-5 text-gray-400'} />
                    <div className={'absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-800'} />
                    <div className={'absolute -top-1 -right-1 h-2 w-2 animate-ping rounded-full bg-red-800'} />
                </Button>
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
                <Card
                    ref={ref}
                    className={
                        'scrollbar absolute right-0 top-full z-20 flex max-h-72 w-72 flex-col flex-col overflow-y-auto !rounded-t-none p-2 font-light shadow'
                    }
                >
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                    <div>уведомление</div>
                </Card>
            </Transition>
        </div>
    );
}
