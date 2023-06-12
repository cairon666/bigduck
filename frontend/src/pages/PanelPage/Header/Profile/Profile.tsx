import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useMemo } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiExit, BiSupport } from 'react-icons/all';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { Card } from '../../../../components/ui';
import { useProfile } from './useProfile';
import { UserNav, UserNavSkeleton } from './UserNav';

export function Profile() {
    const { isOpen, onClick, ref, user, isLoading } = useProfile();

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
                    onClick={onClick}
                    key={item.to}
                    to={item.to}
                    className={classNames(
                        `flex cursor-pointer items-center gap-2 border border-gray-100 border-x-transparent 
                        border-b-transparent py-2 px-4 font-light duration-75 ease-linear hover:border-yellow-500 
                        hover:bg-gray-20`,
                    )}
                >
                    <item.icon className={'h-5 w-5'} />
                    <p>{item.label}</p>
                </Link>
            );
        });
    }, []);

    return (
        <div ref={ref} className={classNames('relative hover:bg-gray-20', isOpen ? 'bg-gray-20' : '')}>
            <button
                type={'button'}
                onClick={onClick}
                className={'flex  cursor-pointer items-center  gap-1 border-transparent p-0 py-2 px-2'}
            >
                <p
                    className={
                        'flex h-[40px] w-[40px] items-center justify-center rounded bg-gray-80 text-sm text-gray-900'
                    }
                >
                    {user ? user.first_name[0].toUpperCase() + user.second_name[0].toUpperCase() : ''}
                </p>
                <RiArrowDownSLine className={'h-5 w-5 text-gray-900'} />
            </button>
            <Transition
                show={isOpen}
                as={Fragment}
                enter='ease-out duration-150'
                enterFrom='opacity-0 translate-y-2'
                enterTo='opacity-100 translate-y-0'
                leave='ease-in duration-150'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-2'
            >
                <Card className={'absolute -right-1 top-full z-20 flex w-72 flex-col !rounded-t-none shadow-md'}>
                    <div className={'p-4'}>
                        {isLoading && !user ? (
                            <UserNavSkeleton />
                        ) : (
                            <UserNav
                                onClick={onClick}
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
