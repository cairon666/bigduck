import classNames from 'classnames';
import { memo } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/all';
import { Link } from 'react-router-dom';

interface UserNavProps {
    fullName: string;
    email: string;
    url?: string;
    onClick?: () => void;
}

export const UserNav = memo(function UserNav(props: UserNavProps) {
    return (
        <Link
            onClick={props.onClick}
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
});

export function UserNavSkeleton() {
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
