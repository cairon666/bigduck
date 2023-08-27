import { NotifyBlock, NotifyBlockSkeleton } from '@/entities/Notify';
import { useNotifyViewer } from '@/entities/Notify/model/selectors';
import { useModal, useOnClickOutside } from '@/shared/hooks';
import { Button, Card } from '@/shared/UIKit';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useRef } from 'react';
import { MdOutlineNotificationsNone } from 'react-icons/md';

export function Notify() {
    const ref = useRef<HTMLDivElement>(null);

    const { notifies, hasUnViewed, isLoading } = useNotifyViewer();
    const { isOpen, onOpen, onClose } = useModal();

    useOnClickOutside(ref, onClose);

    return (
        <div
            ref={ref}
            className={classNames(
                'relative flex h-full items-center justify-center px-2 py-2 hover:bg-gray-20',
                isOpen ? 'bg-gray-20' : '',
            )}
        >
            <Button onClick={onOpen} onFocus={onOpen} theme={'gray'} onlyIcon>
                <MdOutlineNotificationsNone className={'h-5 w-5 text-gray-400'} />
                {hasUnViewed && (
                    <>
                        <div className={'absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-800'} />
                        <div className={'absolute -right-1 -top-1 h-2 w-2 animate-ping rounded-full bg-red-800'} />
                    </>
                )}
            </Button>
            <Transition
                show={isOpen}
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
            >
                <Card
                    className={
                        'absolute right-0 top-full z-20 flex w-72 flex-col overflow-hidden !rounded-t-none font-light shadow'
                    }
                >
                    <div className={'bg-gray-40 px-4 py-1 text-lg font-normal'}>Уведомления</div>
                    <div className={'scrollbar flex max-h-56 flex-col overflow-y-auto'}>
                        {isLoading && !notifies && (
                            <>
                                <NotifyBlockSkeleton />
                                <NotifyBlockSkeleton />
                                <NotifyBlockSkeleton />
                            </>
                        )}
                        {notifies &&
                            notifies.map((notify) => {
                                return (
                                    <NotifyBlock
                                        key={notify.id}
                                        date={notify.date}
                                        title={notify.title}
                                        description={notify.description}
                                        unviewed={notify.unviewed}
                                    />
                                );
                            })}
                    </div>
                </Card>
            </Transition>
        </div>
    );
}
