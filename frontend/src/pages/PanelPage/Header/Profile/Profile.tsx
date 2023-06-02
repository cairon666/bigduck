import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useMemo } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiExit, BiSupport, MdOutlineKeyboardArrowRight } from 'react-icons/all';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { Button, Card } from '../../../../components/ui';
import { useProfile } from './useProfile';

export function Profile() {
    const { isOpen, onOpen, ref, user, isLoading } = useProfile();

    const navList = useMemo(() => {
        const list = [
            {
                to: '/panel/settings',
                label: 'Настройки',
                icon: AiOutlineSetting,
            },
            {
                to: '/panel/support',
                label: 'Помощь',
                icon: BiSupport,
            },
            {
                to: '/panel/logout',
                label: 'Выйти',
                icon: BiExit,
            },
        ];

        return list.map((item) => {
            return (
                <Link
                    key={item.to}
                    to={item.to}
                    className={classNames(
                        'flex cursor-pointer items-center gap-2 border border-gray-100 border-x-transparent border-b-transparent py-2 px-4 font-light duration-75 ease-linear hover:border-yellow-500 hover:bg-gray-20 focus-visible:border-yellow-500 focus-visible:outline-none',
                    )}
                >
                    <item.icon className={'h-5 w-5'} />
                    <p>{item.label}</p>
                </Link>
            );
        });
    }, []);

    return (
        <div className={'relative py-2'}>
            <Button
                theme={'text'}
                onFocus={onOpen}
                onClick={onOpen}
                className={'group flex cursor-pointer items-center gap-1 border-transparent !p-0'}
                onlyIcon
            >
                <p
                    className={
                        'flex h-[40px] w-[40px] items-center justify-center rounded bg-gray-40 text-sm text-gray-900 group-hover:bg-gray-80'
                    }
                >
                    {user ? user.first_name[0].toUpperCase() + user.second_name[0].toUpperCase() : ''}
                </p>
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
                    className={'absolute -right-1 top-full z-20 flex w-72 flex-col flex-col !rounded-t-none shadow-md'}
                >
                    <div className={'p-4'}>
                        {isLoading && !user ? (
                            <UserNavSkeleton />
                        ) : (
                            <UserNav
                                email={user?.email || ''}
                                fullName={`${user?.first_name || ''} ${user?.second_name || ''}`}
                            />
                        )}
                    </div>
                    {navList}
                </Card>
            </Transition>
        </div>
    );
}

interface UserNavProps {
    fullName: string;
    email: string;
    url?: string;
}

function UserNav(props: UserNavProps) {
    return (
        <Link
            to={'/panel/user'}
            className={
                'flex items-center justify-between gap-2 rounded-lg border border-transparent bg-gray-20 p-2 duration-75 ease-linear hover:border-yellow-600 focus-visible:border-yellow-500 focus-visible:outline-none'
            }
        >
            <div className={'flex w-full items-center gap-1 overflow-hidden'}>
                {props.url ? (
                    <img src={props.url} className={'h-8 w-8 min-w-[2rem] rounded-full'} alt='avatar' />
                ) : (
                    <div className={'h-8 w-8 min-w-[2rem] animate-pulse rounded-full bg-gray-80'} />
                )}
                <div className={'flex w-full flex-col overflow-hidden text-sm font-light'}>
                    <p
                        className={classNames(
                            'truncate rounded',
                            props.fullName ? '' : 'h-3 w-full animate-pulse bg-gray-80',
                        )}
                    >
                        {props.fullName}
                    </p>
                    <p
                        className={classNames(
                            'truncate rounded',
                            props.email ? '' : 'mt-1 h-3 w-full animate-pulse bg-gray-80',
                        )}
                    >
                        {props.email}
                    </p>
                </div>
            </div>

            <MdOutlineKeyboardArrowRight className={'text-black min-h-5 min-w-[2rem]'} />
        </Link>
    );
}

function UserNavSkeleton() {
    return (
        <Link
            to={'/panel/user'}
            className={
                'flex items-center justify-between gap-2 rounded-lg border border-transparent bg-gray-20 p-2 hover:border-yellow-600 focus-visible:border-yellow-500 focus-visible:outline-none'
            }
        >
            <div className={'flex w-full items-center gap-1 overflow-hidden'}>
                <div className={'h-8 w-8 min-w-[2rem] animate-pulse rounded-full bg-gray-80'} />
                <div className={'flex w-full flex-col overflow-hidden text-sm font-light'}>
                    <p className={'h-3 w-full animate-pulse truncate rounded bg-gray-80'} />
                    <p className={'mt-1 h-3 w-full animate-pulse truncate rounded bg-gray-80'} />
                </div>
            </div>

            <MdOutlineKeyboardArrowRight className={'text-black min-h-5 min-w-[2rem]'} />
        </Link>
    );
}
