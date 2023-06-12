import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MdOutlineNotificationsNone } from 'react-icons/md';

import { Button, Card } from '../../../../components/ui';
import { useNotify } from './useNotify';

export function Notify() {
    const { isOpen, ref, onOpen, hasUnViewed, isLoading, notifies, onReadAll } = useNotify();

    return (
        <div className={'relative flex flex h-full items-center justify-center'}>
            <div>
                <Button onClick={onOpen} onFocus={onOpen} theme={'gray'} onlyIcon>
                    <MdOutlineNotificationsNone className={'h-5 w-5 text-gray-400'} />
                    {hasUnViewed && (
                        <>
                            <div className={'absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-800'} />
                            <div className={'absolute -top-1 -right-1 h-2 w-2 animate-ping rounded-full bg-red-800'} />
                        </>
                    )}
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
                        'absolute right-0 top-full z-20 flex w-72 flex-col flex-col overflow-hidden !rounded-t-none font-light shadow'
                    }
                >
                    <div className={'bg-gray-40 py-1 px-4 text-lg font-normal'}>Уведомления</div>
                    <div className={'scrollbar flex max-h-56 flex-col overflow-y-auto'}>
                        {isLoading && !notifies && (
                            <>
                                <NotifyBlockSkeleton />
                                <NotifyBlockSkeleton />
                                <NotifyBlockSkeleton />
                            </>
                        )}
                        {/*{notifies &&*/}
                        {/*    notifies.map((notify) => {*/}
                        {/*        return (*/}
                        {/*            <NotifyBlock*/}
                        {/*                key={notify.id}*/}
                        {/*                date={notify.date}*/}
                        {/*                title={notify.title}*/}
                        {/*                description={notify.description}*/}
                        {/*                unviewed={notify.unviewed}*/}
                        {/*            />*/}
                        {/*        );*/}
                        {/*    })}*/}
                    </div>
                    <div className={'flex items-center justify-end border-t-2 border-gray-80 py-1 px-2'}>
                        <Button disabled={!hasUnViewed} isLoading={isLoading} onClick={onReadAll} theme={'text'}>
                            Прочитать все
                        </Button>
                    </div>
                </Card>
            </Transition>
        </div>
    );
}

interface NotifyBlockProps {
    date?: Date;
    title?: string;
    description?: string;
    unviewed?: boolean;
}

function NotifyBlock(props: NotifyBlockProps) {
    return (
        <div
            className={
                'w-full cursor-pointer border border-r-transparent border-l-transparent border-b-transparent border-t-gray-100 py-2 px-4 text-sm font-light duration-75 ease-linear hover:border-yellow-500'
            }
        >
            <h4 className={'w-full rounded font-normal'}>{props.title || ''}</h4>
            <p className={'w-full rounded line-clamp-4'}>{props.description || ''}</p>
            <div className={'flex items-center justify-between'}>
                <p className={'text-red-800'}>{props.unviewed ? 'Новое' : ''}</p>
                <p className={'rounded text-xs text-gray-600'}>{props.date ? dateToString(props.date) : ''}</p>
            </div>
        </div>
    );
}

function dateToString(date: Date): string {
    return `${date.getFullYear()}.${addZero(date.getMonth())}.${addZero(date.getDate())} ${addZero(
        date.getHours(),
    )}:${addZero(date.getMinutes())}`;
}

function addZero(d: number): string {
    return d < 10 ? `0${d}` : `${d}`;
}

function NotifyBlockSkeleton() {
    return (
        <div
            className={
                'w-full cursor-pointer border border-r-transparent border-l-transparent border-b-transparent border-t-gray-100 py-2 px-4'
            }
        >
            <div className={'h-4 w-full animate-pulse rounded bg-gray-80 font-normal'} />
            <div className={'mt-1 h-8 w-full animate-pulse rounded bg-gray-80'} />
            <div className={'flex items-center justify-between'}>
                <div />
                <p className={'mt-1 h-2 w-20 animate-pulse rounded bg-gray-80'} />
            </div>
        </div>
    );
}
