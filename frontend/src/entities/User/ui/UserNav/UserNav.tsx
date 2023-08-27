import classNames from 'classnames';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

export interface UserNavProps {
    fullName?: string;
    avatarURl?: string;
    email?: string;
}

export function UserNav({ fullName, avatarURl, email }: UserNavProps) {
    return (
        <Link
            to={'/panel/user'}
            className={
                'flex items-center justify-between gap-2 rounded-lg border border-transparent bg-gray-20 p-2 duration-75 ease-linear hover:border-yellow-600 focus-visible:border-yellow-500 focus-visible:outline-none'
            }
        >
            <div className={'flex w-full items-center gap-1 overflow-hidden'}>
                {avatarURl ? (
                    <img src={avatarURl} className={'h-8 w-8 min-w-[2rem] rounded-full'} alt="avatar" />
                ) : (
                    <div className={'h-8 w-8 min-w-[2rem] animate-pulse rounded-full bg-gray-80'} />
                )}
                <div className={'flex w-full flex-col overflow-hidden text-sm font-light'}>
                    <p
                        className={classNames(
                            'truncate rounded',
                            fullName ? '' : 'h-3 w-full animate-pulse bg-gray-80',
                        )}
                    >
                        {fullName}
                    </p>
                    <p
                        className={classNames(
                            'truncate rounded',
                            email ? '' : 'mt-1 h-3 w-full animate-pulse bg-gray-80',
                        )}
                    >
                        {email}
                    </p>
                </div>
            </div>

            <MdOutlineKeyboardArrowRight className={'text-black min-h-5 min-w-[2rem]'} />
        </Link>
    );
}
